/**
 * ProjectsSection Component
 * 
 * Purpose: Displays a grid of project cards with GitHub stats integration
 * 
 * Implementation:
 * - Uses GitHub API (via Octokit) to fetch star counts for repositories
 * - Implements caching to reduce API calls
 * - Renders responsive grid of project cards
 * 
 * Technologies:
 * - React + TypeScript
 * - Tailwind CSS for styling
 * - Octokit for GitHub API integration
 * 
 * Interaction:
 * - Receives projects data from parent component
 * - Fetches GitHub stats on component mount
 * - Renders interactive project cards with hover effects
 */
import { Section } from './Section';
import { Card } from './Card';
import type { Project } from '../types/profile';
import { useEffect, useState } from 'react';
import { Github, Star } from 'lucide-react';
import { Octokit } from 'octokit';

interface ProjectsSectionProps {
  projects: Project[];
}

interface CachedStats {
  [key: string]: number;
}

const CACHE_KEY = 'github_stars_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [starCounts, setStarCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchGithubStats = async () => {
      // Try to get cached data first
      const cached = localStorage.getItem(CACHE_KEY);
      let cachedStats: CachedStats = {};
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          cachedStats = data;
        }
      }

      // Initialize Octokit with token if available
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      const octokit = token ? new Octokit({ auth: token }) : new Octokit();

      const updatedProjects = await Promise.all(
        projects.map(async (project) => {
          if (!project.url.includes('github.com')) return project;

          try {
            const [owner, repo] = project.url.split('/').slice(-2);
            const cacheKey = `${owner}/${repo}`;

            // Use cached data if available
            if (cachedStats[cacheKey] !== undefined) {
              return { ...project, stars: cachedStats[cacheKey] };
            }

            // Fetch new data
            const { data } = await octokit.rest.repos.get({ owner, repo });
            cachedStats[cacheKey] = data.stargazers_count;
            return { ...project, stars: data.stargazers_count };
          } catch (error) {
            console.warn(`Failed to fetch stats for ${project.name}:`, error);
            return project;
          }
        })
      );

      // Update cache
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: cachedStats,
          timestamp: Date.now(),
        })
      );

      const starCounts = updatedProjects.reduce((acc, project) => {
        if (project.stars !== undefined) {
          acc[project.url] = project.stars;
        }
        return acc;
      }, {});

      setStarCounts(starCounts);
    };

    fetchGithubStats();
  }, [projects]);

  return (
    <Section className="bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(51,65,85,0.1)_0%,transparent_65%)]" />
      
      <div className="relative">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-accent-200 
          bg-clip-text text-transparent mb-12 text-center">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:-translate-y-1"
            >
              <Card className="h-full relative overflow-hidden bg-gray-800/30 backdrop-blur-md p-6
                border border-gray-700/50 shadow-[0_0_15px_rgba(0,0,0,0.1)]
                before:absolute before:inset-0
                before:bg-gradient-to-r before:from-blue-500/10 before:via-purple-500/10 before:to-blue-500/10
                before:opacity-0 before:transition-opacity before:duration-500
                hover:before:opacity-100">
                <div className="relative z-10">
                  <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 
                        transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 ring-1 ring-accent-500/30 
                      group-hover:ring-accent-500/50 rounded-xl transition-all duration-300" />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 
                        group-hover:text-accent-300 transition-colors duration-300">
                        {project.name}
                      </h3>
                      <p className="text-gray-300 line-clamp-2">{project.description}</p>
                    </div>
                    {starCounts[project.url] !== undefined && (
                      <div className="flex items-center gap-1 text-gray-400">
                        <Star size={20} />
                        <span className="text-sm font-medium">{starCounts[project.url]}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-sm text-accent-300 bg-accent-900/30 
                          rounded-md ring-1 ring-accent-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}