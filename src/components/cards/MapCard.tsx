import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { BentoCard } from './BentoCard';
import { MapCard as MapCardType } from '../../types/profile';

interface MapCardProps {
  card: MapCardType;
}

export const MapCard: React.FC<MapCardProps> = ({ card }) => {
  // 默认坐标，如果没有提供
  const defaultLat = card.coordinates?.lat || 31.2304;
  const defaultLng = card.coordinates?.lng || 121.4737;
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const mapId = `map-${card.id}`; // 确保每个地图有唯一ID
  
  useEffect(() => {
    // 在组件挂载后动态加载Leaflet脚本和样式
    const loadLeaflet = async () => {
      // 如果window对象中没有L，加载Leaflet
      if (!(window as any).L) {
        // 加载Leaflet CSS
        const linkEl = document.createElement('link');
        linkEl.rel = 'stylesheet';
        linkEl.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        linkEl.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        linkEl.crossOrigin = '';
        document.head.appendChild(linkEl);
        
        // 加载Leaflet JS
        const scriptEl = document.createElement('script');
        scriptEl.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        scriptEl.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        scriptEl.crossOrigin = '';
        document.body.appendChild(scriptEl);
        
        // 等待脚本加载完成
        return new Promise<void>((resolve) => {
          scriptEl.onload = () => resolve();
        });
      }
      return Promise.resolve();
    };
    
    // 加载并初始化地图
    const initMap = async () => {
      await loadLeaflet();
      
      if (!mapRef.current || !(window as any).L) return;
      
      const L = (window as any).L;
      
      // 确保我们不会重复初始化同一个容器
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      
      // 初始化地图
      const map = L.map(mapRef.current, {
        center: [defaultLat, defaultLng],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        tap: false,
        touchZoom: false,
        doubleClickZoom: false
      });
      
      // 保存地图实例引用
      mapInstanceRef.current = map;
      
      // 使用更美观的地图图层
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map);
      
      // 添加自定义样式的标记
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div class="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center shadow-lg">
                 <div class="w-4 h-4 bg-white rounded-full"></div>
               </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
      
      L.marker([defaultLat, defaultLng], { icon: customIcon }).addTo(map);
    };
    
    initMap();
    
    // 清理函数
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [card.id, defaultLat, defaultLng]); // 添加card.id作为依赖以确保ID变化时重新初始化
  
  return (
    <BentoCard card={card}>
      <div className="w-full h-full bg-[#111] rounded-2xl overflow-hidden">
        <div className="w-full h-full relative">
          {/* 地图容器 - 添加唯一ID */}
          <div 
            id={mapId}
            ref={mapRef} 
            className="absolute inset-0 z-0"
          />
          
          {/* 半透明遮罩 - 移除了深色遮罩，改用更轻微的暗色调 */}
          <div className="absolute inset-0 bg-gray-900/10 z-10"></div>
          
          {/* 内容 */}
          <div className="absolute inset-0 p-4 flex flex-col justify-center items-center text-center z-20">
            <div className="bg-gray-900/70 p-3 rounded-xl backdrop-blur-sm">
              <MapPin size={28} className="text-accent-500 mx-auto mb-2" />
              <h3 className="text-lg font-medium text-white">
                {card.title}
              </h3>
              <p className="text-sm text-gray-300 mt-1">
                {card.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}; 