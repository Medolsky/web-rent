/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Map, 
  ListChecks, 
  UserCheck, 
  Compass, 
  Search, 
  Building, 
  Database, 
  Check, 
  Info, 
  Filter, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  ShieldAlert, 
  Layout, 
  MessageSquare,
  Cpu,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-react';
import { webFlowData, featuresPlanData, FeaturePlanItem, FlowNode } from '../data/initialData';

export default function CreatorWorkspace() {
  const [activeTab, setActiveTab] = useState<'flow' | 'features' | 'matrix' | 'roles'>('flow');
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(webFlowData.nodes[1]); // Default to Homepage node
  const [selectedFlow, setSelectedFlow] = useState<'all' | 'rent' | 'admin' | 'contact'>('all');
  
  // States for Features Plan tab
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('Semua');
  const [filterPriority, setFilterPriority] = useState<string>('Semua');

  // Filtered features
  const filteredFeatures = useMemo(() => {
    return featuresPlanData.filter(item => {
      const matchSearch = item.fitur.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.dependencies.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = filterCategory === 'Semua' || item.kategori === filterCategory;
      const matchPriority = filterPriority === 'Semua' || item.prioritas === filterPriority;
      return matchSearch && matchCategory && matchPriority;
    });
  }, [searchQuery, filterCategory, filterPriority]);

  // Determine if connection is active based on active flow filter
  const isConnectionActive = (fromId: string, toId: string) => {
    if (selectedFlow === 'all') return true;
    
    const rentFlows = [
      'p-start', 'p-home', 'p-dec-explore', 
      'p-kategori', 'p-dec-booking', 'p-wa-direct',
      'p-about', 'p-blog'
    ];
    const adminFlows = [
      'a-login', 'a-dashboard', 'a-dec-menu', 
      'a-crud-bus', 'a-crud-blog', 'a-crud-banner', 'a-inbox',
      'p-kategori', 'p-blog', 'p-kontak' // connections feed
    ];
    const contactFlows = [
      'p-start', 'p-home', 'p-dec-explore', 'p-kontak', 
      'a-inbox', 'a-login', 'a-dashboard', 'a-dec-menu'
    ];

    if (selectedFlow === 'rent') {
      return rentFlows.includes(fromId) && rentFlows.includes(toId);
    }
    if (selectedFlow === 'admin') {
      return adminFlows.includes(fromId) && adminFlows.includes(toId);
    }
    if (selectedFlow === 'contact') {
      return contactFlows.includes(fromId) && contactFlows.includes(toId);
    }
    return true;
  };

  // Determine if node is active based on active flow filter
  const isNodeActive = (nodeId: string) => {
    if (selectedFlow === 'all') return true;
    if (selectedFlow === 'rent') {
      return ['p-start', 'p-home', 'p-dec-explore', 'p-kategori', 'p-about', 'p-blog', 'p-dec-booking', 'p-wa-direct'].includes(nodeId);
    }
    if (selectedFlow === 'admin') {
      return ['a-login', 'a-dashboard', 'a-dec-menu', 'a-crud-bus', 'a-crud-blog', 'a-crud-banner', 'a-inbox'].includes(nodeId);
    }
    if (selectedFlow === 'contact') {
      return ['p-start', 'p-home', 'p-dec-explore', 'p-kontak', 'a-inbox', 'a-dashboard', 'a-login', 'a-dec-menu'].includes(nodeId);
    }
    return true;
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800" id="creator-workspace-root">
      {/* Top Professional Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-850 text-white border-b border-slate-700 py-6 px-6 sm:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-orange-500 text-white font-bold text-xs uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Cpu className="w-3 h-3" /> ARCHITECT SUITE
              </span>
              <span className="text-slate-400 text-sm">v1.2 (Sewa Bus Pariwisata)</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight mt-1 bg-gradient-to-r from-white via-slate-200 to-orange-200 bg-clip-text text-transparent">
              Arsitektur Web Flow & Rencana Fitur Detail
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Lembar deliverables terintegrasi untuk tim pengembang (development team) yang menerjemahkan alur pengguna, decision gates, model CRUD admin panel, and prioritasi fitur.
            </p>
          </div>
          
          {/* Quick Stats Summary */}
          <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-1 md:pb-0">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2 text-center min-w-[100px] flex-shrink-0">
              <div className="text-xs text-slate-400">Total Node Flow</div>
              <div className="text-lg font-bold text-orange-400">{webFlowData.nodes.length} Item</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2 text-center min-w-[100px] flex-shrink-0">
              <div className="text-xs text-slate-400">Fitur Terencana</div>
              <div className="text-lg font-bold text-orange-400">{featuresPlanData.length} Modul</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2 text-center min-w-[100px] flex-shrink-0">
              <div className="text-xs text-slate-400">Prioritas Core</div>
              <div className="text-lg font-bold text-emerald-400">
                {featuresPlanData.filter(f => f.prioritas === 'Must-Have').length} Must
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs for Architecture Suite */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-px mb-6 bg-white p-1 rounded-2xl shadow-sm border">
          <button
            id="tab-btn-flow"
            onClick={() => setActiveTab('flow')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'flow' 
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Map className="w-4 h-4" />
            1. Peta Alur Web (Web Flow Diagram)
          </button>
          <button
            id="tab-btn-features"
            onClick={() => setActiveTab('features')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'features' 
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ListChecks className="w-4 h-4" />
            2. Daftar Rencana Fitur (Features Database)
          </button>
          <button
            id="tab-btn-matrix"
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'matrix' 
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            3. Matriks Prioritas Kerja (Priority Plan)
          </button>
          <button
            id="tab-btn-roles"
            onClick={() => setActiveTab('roles')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'roles' 
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            4. Peran Pengguna & Perizinan (Roles & Matrix)
          </button>
        </div>

        {/* --- TAB 1: WEB FLOW DIAGRAM --- */}
        {activeTab === 'flow' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-2 h-5 bg-orange-500 rounded-sm"></div>
                    Peta Perjalanan Pengguna & Workflow Operasi Sistem
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Diagram visual interaktif yang menunjukkan pergerakan Pengunjung dan Administrator dari pintu masuk, gerbang keputusan, integrasi WhatsApp, hingga database CRUD.
                  </p>
                </div>
                
                {/* Flow Filter Highlighters */}
                <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1 rounded-xl">
                  <span className="text-xs text-slate-500 pl-2 pr-1 font-medium font-sans">Ubah Alur Sorotan:</span>
                  <button
                    onClick={() => setSelectedFlow('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                      selectedFlow === 'all' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Semua Alur
                  </button>
                  <button
                    onClick={() => setSelectedFlow('rent')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                      selectedFlow === 'rent' 
                        ? 'bg-emerald-500 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-emerald-600'
                    }`}
                  >
                    Sewa Bus (Publik)
                  </button>
                  <button
                    onClick={() => setSelectedFlow('admin')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                      selectedFlow === 'admin' 
                        ? 'bg-sky-500 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-sky-600'
                    }`}
                  >
                    Admin Control
                  </button>
                  <button
                    onClick={() => setSelectedFlow('contact')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                      selectedFlow === 'contact' 
                        ? 'bg-orange-500 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-orange-600'
                    }`}
                  >
                    Umpan Balik Kontak
                  </button>
                </div>
              </div>

              {/* Responsive Flowchart Canvas Container */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* SVG Canvas Area */}
                <div className="lg:col-span-3 bg-slate-950 rounded-2xl p-4 border border-slate-900 relative shadow-inner overflow-x-auto">
                  <div className="min-w-[900px] py-4">
                    {/* Architectural Legend */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-3 bg-slate-900/90 backdrop-blur-md rounded-xl p-3 border border-slate-800 z-10 text-[10px] text-white">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
                        <span>Entry / Halaman Publik</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500 block"></span>
                        <span>Akses Admin Panel</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500 block"></span>
                        <span>Gerbang Keputusan</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 block"></span>
                        <span>Redirect API / System Feed</span>
                      </div>
                    </div>

                    <svg viewBox="0 0 1150 620" className="w-full h-auto">
                      {/* SVG Definitions for Arrow Markers */}
                      <defs>
                        <marker id="arrow-visitor" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                        </marker>
                        <marker id="arrow-admin" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                        </marker>
                        <marker id="arrow-system" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                        </marker>
                        <marker id="arrow-fade" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
                        </marker>
                      </defs>

                      {/* Render Connections/Arrows first so they lie behind nodes */}
                      {webFlowData.connections.map((conn, index) => {
                        const fromNode = webFlowData.nodes.find(n => n.id === conn.from);
                        const toNode = webFlowData.nodes.find(n => n.id === conn.to);
                        if (!fromNode || !toNode) return null;

                        const active = isConnectionActive(conn.from, conn.to);
                        
                        // Select color based on path
                        let strokeColor = '#334155'; // faded path
                        let markerId = 'arrow-fade';
                        
                        if (active) {
                          if (fromNode.tipe === 'visitor' || toNode.id.startsWith('p-')) {
                            strokeColor = '#10b981'; // emerald
                            markerId = 'arrow-visitor';
                          } else if (fromNode.tipe === 'admin' || toNode.id.startsWith('a-')) {
                            strokeColor = '#0ea5e9'; // sky
                            markerId = 'arrow-admin';
                          } else if (fromNode.tipe === 'system' || toNode.id === 'p-wa-direct') {
                            strokeColor = '#6366f1'; // indigo
                            markerId = 'arrow-system';
                          }
                        }

                        // Cubic Bezier Curving for arrows to look incredibly sleek
                        // Calculating mid control points
                        const dx = Math.abs(toNode.x - fromNode.x);
                        const dy = Math.abs(toNode.y - fromNode.y);
                        const controlX1 = fromNode.x + dx * 0.4;
                        const controlY1 = fromNode.y;
                        const controlX2 = toNode.x - dx * 0.4;
                        const controlY2 = toNode.y;

                        // Check if vertical connection (like feeding categories/inbox)
                        const isVertical = dx < 50;
                        const pathD = isVertical
                          ? `M ${fromNode.x} ${fromNode.y} C ${fromNode.x} ${(fromNode.y + toNode.y)/2}, ${toNode.x} ${(fromNode.y + toNode.y)/2}, ${toNode.x} ${toNode.y}`
                          : `M ${fromNode.x} ${fromNode.y} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${toNode.x} ${toNode.y}`;

                        return (
                          <g key={`conn-${index}`} className="transition-all duration-300">
                            {/* Glowing line for active */}
                            {active && (
                              <path
                                d={pathD}
                                fill="none"
                                stroke={strokeColor}
                                strokeWidth="4"
                                strokeOpacity="0.2"
                                className="animate-pulse"
                              />
                            )}
                            <path
                              d={pathD}
                              fill="none"
                              stroke={strokeColor}
                              strokeWidth={active ? 2.5 : 1}
                              strokeDasharray={(!active) ? '4 4' : (conn.label === 'Auto Update' || conn.label === 'Form Submit' ? '6 4' : 'none')}
                              markerEnd={`url(#${markerId})`}
                              className="transition-all"
                            />
                            {/* Connection Labels */}
                            {conn.label && active && (
                              <foreignObject
                                x={(fromNode.x + toNode.x) / 2 - 45}
                                y={(fromNode.y + toNode.y) / 2 - 14}
                                width="90"
                                height="20"
                              >
                                <div className="text-[9px] text-center bg-slate-900 border border-slate-800 text-slate-300 rounded px-1.5 py-0.5 truncate font-sans scale-90">
                                  {conn.label}
                                </div>
                              </foreignObject>
                            )}
                          </g>
                        );
                      })}

                      {/* Draw Visual Track Boundaries */}
                      <line x1="50" y1="310" x2="1100" y2="310" stroke="#1e293b" strokeWidth="2" strokeDasharray="8 8" />
                      <text x="70" y="300" fill="#64748b" className="text-xs font-semibold uppercase tracking-widest font-sans">
                        JALUR WEBSITE PUBLIK (VISITOR JOURNEY)
                      </text>
                      <text x="70" y="335" fill="#64748b" className="text-xs font-semibold uppercase tracking-widest font-sans">
                        JALUR KONTROL ADMIN (PORTAL WORKFLOW)
                      </text>

                      {/* Render Interactive Nodes */}
                      {webFlowData.nodes.map((node) => {
                        const active = isNodeActive(node.id);
                        const isSelected = selectedNode?.id === node.id;
                        
                        let nodeBg = 'bg-slate-850';
                        let nodeBorder = 'border-slate-700';
                        let glowClr = '';

                        if (active) {
                          if (node.tipe === 'visitor') {
                            nodeBg = isSelected ? 'bg-emerald-500' : 'bg-slate-900';
                            nodeBorder = isSelected ? 'border-emerald-300' : 'border-emerald-500';
                            glowClr = 'rgba(16,185,129,0.3)';
                          } else if (node.tipe === 'admin') {
                            nodeBg = isSelected ? 'bg-sky-500' : 'bg-slate-900';
                            nodeBorder = isSelected ? 'border-sky-300' : 'border-sky-500';
                            glowClr = 'rgba(14,165,233,0.3)';
                          } else if (node.tipe === 'decision') {
                            nodeBg = isSelected ? 'bg-orange-500' : 'bg-slate-900';
                            nodeBorder = isSelected ? 'border-orange-300' : 'border-orange-500';
                            glowClr = 'rgba(249,115,22,0.3)';
                          } else {
                            nodeBg = isSelected ? 'bg-indigo-500' : 'bg-slate-900';
                            nodeBorder = isSelected ? 'border-indigo-300' : 'border-indigo-500';
                            glowClr = 'rgba(99,102,241,0.3)';
                          }
                        } else {
                          nodeBg = 'bg-slate-900/30';
                          nodeBorder = 'border-slate-800/40 text-slate-600';
                        }

                        return (
                          <g 
                            key={node.id} 
                            transform={`translate(${node.x}, ${node.y})`}
                            className="cursor-pointer transition-all duration-300 hover:scale-105"
                            onClick={() => active && setSelectedNode(node)}
                          >
                            {/* Selected Pulse Background */}
                            {isSelected && active && (
                              <circle r="60" fill="none" stroke={node.tipe === 'visitor' ? '#10b981' : node.tipe === 'admin' ? '#0ea5e9' : node.tipe === 'decision' ? '#f97316' : '#6366f1'} strokeWidth="1" className="stroke-dasharray-4 animate-spin" style={{ animationDuration: '8s' }} />
                            )}
                            
                            {/* Core Node Card Shape (Oval / Rounded Rect) */}
                            <foreignObject x="-75" y="-30" width="150" height="60">
                              <div 
                                className={`w-full h-full rounded-2xl border flex flex-col justify-center items-center p-2 text-center text-xs transition-all ${nodeBg} ${nodeBorder} ${
                                  isSelected ? 'text-slate-950 font-bold shadow-lg shadow-orange-500/10' : 'text-white'
                                }`}
                                style={{
                                  boxShadow: isSelected ? `0 0 15px ${glowClr}` : undefined,
                                  opacity: active ? 1 : 0.4
                                }}
                              >
                                <span className={`text-[10px] uppercase tracking-wider block font-semibold ${
                                  isSelected ? 'text-slate-950/80' : 'text-slate-400'
                                }`}>
                                  {node.id.toUpperCase()}
                                </span>
                                <span className="font-semibold px-1 line-clamp-2 leading-tight">
                                  {node.label}
                                </span>
                              </div>
                            </foreignObject>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Node Inspector Panel */}
                <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-lg flex flex-col h-full">
                  <div className="border-b border-slate-800 pb-3 mb-4">
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" /> DETAIL NODE FLOW
                    </span>
                    <h3 className="text-md font-bold mt-1 text-slate-100 italic">
                      "Inspect-a-Node" Module
                    </h3>
                  </div>

                  {selectedNode ? (
                    <div className="space-y-4 flex-1">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Nama Node:</div>
                        <div className="text-lg font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
                          {selectedNode.label}
                        </div>
                        <span className={`inline-block text-[9px] uppercase px-2 py-0.5 mt-1.5 rounded-full font-bold ${
                          selectedNode.tipe === 'visitor' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                          selectedNode.tipe === 'admin' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 
                          selectedNode.tipe === 'decision' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 
                          'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                        }`}>
                          {selectedNode.tipe === 'visitor' ? 'Visitor Gate' :
                           selectedNode.tipe === 'admin' ? 'Admin Workflow' :
                           selectedNode.tipe === 'decision' ? 'Keputusan Pengguna' : 'Aksi Sistem / API'}
                        </span>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-sans">Deskripsi Detail:</div>
                        <p className="text-xs text-slate-200 mt-1 leading-relaxed font-sans">
                          {selectedNode.deskripsi}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Metode Teknis / Dependensi:</div>
                        <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-850/80 text-orange-400 font-bold">
                          {selectedNode.id === 'p-start' && 'Entry: HTTP / Direct URL'}
                          {selectedNode.id === 'p-home' && 'React Hooks, SVG Icons'}
                          {selectedNode.id === 'p-dec-explore' && 'React Navigator / Tab States'}
                          {selectedNode.id === 'p-kategori' && 'Array.filter(), useState()'}
                          {selectedNode.id === 'p-about' && 'Static Components'}
                          {selectedNode.id === 'p-blog' && 'Dynamic Feed <Array>'}
                          {selectedNode.id === 'p-kontak' && 'Regex Email, onSubmit Event'}
                          {selectedNode.id === 'p-dec-booking' && 'Sticky Bottom Button Offset'}
                          {selectedNode.id === 'p-wa-direct' && 'window.location = wa.me/API'}
                          {selectedNode.id === 'a-login' && 'Mock state: authIsLoggedIn'}
                          {selectedNode.id === 'a-dashboard' && 'Recharts Bar/Area Responsive'}
                          {selectedNode.id === 'a-dec-menu' && 'Admin Sidebar Selection'}
                          {selectedNode.id === 'a-crud-bus' && 'State: setBuses([...buses])'}
                          {selectedNode.id === 'a-crud-blog' && 'State: setBlogs([...blogs])'}
                          {selectedNode.id === 'a-crud-banner' && 'State: setBanners([...flags])'}
                          {selectedNode.id === 'a-inbox' && 'Contact messages store'}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Aktor Terkait:</div>
                        <div className="text-xs font-semibold text-slate-300 mt-0.5">
                          {selectedNode.id.startsWith('p-') ? 'Pengunjung Rental Bus / Penyewa' : 'Administrator Sistem / Agen Bus'}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-slate-500 py-10 my-auto">
                      <p className="text-xs italic">Silakan klik salah satu node dalam diagram untuk melakukan inspeksi teknis alur kerja.</p>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500 text-center font-mono">
                    Sewa Bus Pariwisata Blueprint
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Flow Analysis Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-slate-900 pointer-events-none">
                  <Compass className="w-24 h-24" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
                  Analisis Alur Website Publik (User Journey)
                </h3>
                <ul className="mt-4 space-y-3.5 text-sm text-slate-600 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="bg-emerald-100 text-emerald-800 rounded-lg p-1 text-[10px] font-bold mt-0.5">1</span>
                    <div>
                      <strong>Konsolidasi Landing Page:</strong> Seluruh USP (Unique Selling Proposition), banner iklan promo utama, review armada terfavorit, dan form kontak cepat berada terpusat pada Homepage demi performa konversi tinggi.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-emerald-100 text-emerald-800 rounded-lg p-1 text-[10px] font-bold mt-0.5">2</span>
                    <div>
                      <strong>The Booking Friction Reduction:</strong> Penempatan tombol booking bus *khusus* pada Header Top Navigation (sticky) dan Footer paling bawah bertujuan agar mata pengunjung fokus ke detail armada foto melengkung yang estetik dlu tanpa gangguan, sebelum diarahkan ke chat WhatsApp yang dipicu string pre-filled.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-emerald-100 text-emerald-800 rounded-lg p-1 text-[10px] font-bold mt-0.5">3</span>
                    <div>
                      <strong>No Leakage Policy:</strong> WhatsApp tidak diletakkan di listing individual untuk meredam spam, melainkan dikoordinasikan secara eksklusif agar admin dapat melakukan cross-selling unit bus lain jika opsi utama penuh.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-slate-900 pointer-events-none">
                  <Cpu className="w-24 h-24" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-sky-500 rounded-full"></span>
                  Analisis Alur Kerja Admin Panel
                </h3>
                <ul className="mt-4 space-y-3.5 text-sm text-slate-600 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="bg-sky-100 text-sky-800 rounded-lg p-1 text-[10px] font-bold mt-0.5">1</span>
                    <div>
                      <strong>Dashboard Metrics Sync:</strong> Setiap pengisian Form Kontak dan klik tombol booking WA dari pengunjung langsung dihitung, ditabulasikan, dan disajikan dengan grafik dinamis untuk memantau traffic.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-sky-100 text-sky-800 rounded-lg p-1 text-[10px] font-bold mt-0.5">2</span>
                    <div>
                      <strong>Dynamic Inventory Management (CRUD):</strong> Admin punya kontrol mutlak untuk menambah, memperbarui status unit (Misal: unit Hiace sedang masuk bengkel status 'Perbaikan' agar otomatis meredam tombol visual pemesanan publik), hingga mengupdate diskon.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-sky-100 text-sky-800 rounded-lg p-1 text-[10px] font-bold mt-0.5">3</span>
                    <div>
                      <strong>Content Hub:</strong> Pemuatan tulisan-tulisan blog pariwisata yang kaya foto mengizinkan tim marketing mengunggah draf SEO sewaktu-waktu demi menjajah halaman 1 Google Search.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: DETAILED FEATURES DATABASE --- */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-2 h-5 bg-orange-500 rounded-sm"></div>
                  Rencana Detail Fitur Berorientasi Pelanggan (System Features Plan)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Kumpulan spesifikasi fungsi fungsional, taksonomi prioritas kerja, dependencies, dan pembagian peran pembangunan bagi tim front-end dan back-end.
                </p>
              </div>

              {/* Advanced Search & Filtering controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="text"
                    placeholder="Cari fitur, deskripsi, atau dependensi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="text-slate-400 w-4.5 h-4.5 flex-shrink-0" />
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Kategori:</span>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="Semua">Semua Kategori</option>
                    <option value="Website Publik">Website Publik Only</option>
                    <option value="Admin Panel">Admin Panel Only</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="text-slate-400 w-4.5 h-4.5 flex-shrink-0" />
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Prioritas:</span>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="Semua">Semua Prioritas</option>
                    <option value="Must-Have">Must-Have (Kritis)</option>
                    <option value="Should-Have">Should-Have (Penting)</option>
                    <option value="Nice-to-Have">Nice-to-Have (Tambahan)</option>
                  </select>
                </div>
              </div>

              {/* Table Render */}
              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white font-semibold flex-row">
                      <th className="p-4 rounded-tl-xl">ID</th>
                      <th className="p-4">Fitur Sistem</th>
                      <th className="p-4">Tipe Kategori</th>
                      <th className="p-4">Spesifikasi Kerja / Skenario</th>
                      <th className="p-4 text-center">Prioritas</th>
                      <th className="p-4">Kebutuhan Dependensi</th>
                      <th className="p-4 rounded-tr-xl">Target Pengguna</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredFeatures.length > 0 ? (
                      filteredFeatures.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-mono font-bold text-orange-600">{item.id}</td>
                          <td className="p-4 font-bold text-slate-800">{item.fitur}</td>
                          <td className="p-4">
                            <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-bold ${
                              item.kategori === 'Website Publik' 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                : item.kategori === 'Admin Panel'
                                ? 'bg-sky-50 text-sky-700 border border-sky-100'
                                : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                            }`}>
                              {item.kategori}
                            </span>
                          </td>
                          <td className="p-4 text-slate-600 font-sans leading-relaxed max-w-sm">{item.deskripsi}</td>
                          <td className="p-4 text-center">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase ${
                              item.prioritas === 'Must-Have'
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : item.prioritas === 'Should-Have'
                                ? 'bg-orange-100 text-orange-850 border border-orange-200'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}>
                              {item.prioritas}
                            </span>
                          </td>
                          <td className="p-4 text-slate-600 font-sans font-medium">{item.dependencies}</td>
                          <td className="p-4 font-semibold text-slate-700">{item.pelaku}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400 italic font-sans">
                          Tidak ditemukan fitur pariwisata yang cocok dengan kriteria pencarian Anda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Developer Action Checkboxes */}
              <div className="mt-6 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-1.5 mb-2.5">
                  <CheckCircle2 className="text-emerald-500 w-4 h-4" /> Checklist Kesiapan Implementasi (Dev Checklist)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "Strukturkan types & mock initial state",
                    "Konfigurasi router layout web",
                    "Desain card armada lengkung rounded-3xl",
                    "Batasi tombol booking ke header & footer saja",
                    "Sertifikasi format pesan WA pre-filled",
                    "Hubungkan API feedback database admin",
                    "Persiapkan visual chart analytic Recharts",
                    "Integrasikan sistem login pseudo-auth admin"
                  ].map((task, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm">
                      <input type="checkbox" id={`chk-${i}`} defaultChecked={i < 5} className="rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                      <label htmlFor={`chk-${i}`} className="text-xs text-slate-600 font-sans cursor-pointer select-none">
                        {task}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 3: PRIORITY MATRIX --- */}
        {activeTab === 'matrix' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-2 h-5 bg-orange-500 rounded-sm"></div>
                  Matriks Prioritas Peluncuran Layanan (Priority Matrix Roadmap)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Pengelompokan fitur-fitur pariwisata ke dalam kuadran prioritas rilis produk (Minimum Viable Product).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. MUST-HAVE CANDIDATES */}
                <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100 flex flex-col h-full shadow-sm">
                  <div className="flex items-center justify-between mb-3.5 border-b border-rose-100 pb-2">
                    <span className="text-xs font-bold text-rose-800 uppercase tracking-widest">
                      🔥 KUADRAN 1: MUST-HAVE
                    </span>
                    <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      CRITICAL (MVP)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed mb-4">
                    Fitur wajib ada di hari rilis utama. Website tidak akan fungsional tanpa pilar ini.
                  </p>
                  <div className="space-y-2.5 flex-1">
                    {featuresPlanData.filter(f => f.prioritas === 'Must-Have').map(f => (
                      <div key={f.id} className="bg-white rounded-xl p-3 border border-rose-100 shadow-sm text-xs relative hover:rotate-1 transition-all">
                        <div className="font-bold text-slate-800">{f.fitur}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{f.deskripsi}</div>
                        <div className="flex items-center gap-2 mt-2 pt-1.5 border-t border-slate-50">
                          <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-semibold">{f.kategori}</span>
                          <span className="text-[9px] text-slate-400 font-mono ml-auto">{f.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. SHOULD-HAVE CANDIDATES */}
                <div className="bg-orange-50/50 rounded-2xl p-5 border border-orange-100 flex flex-col h-full shadow-sm">
                  <div className="flex items-center justify-between mb-3.5 border-b border-orange-100 pb-2">
                    <span className="text-xs font-bold text-orange-850 uppercase tracking-widest">
                      ⚡ KUADRAN 2: SHOULD-HAVE
                    </span>
                    <span className="bg-orange-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      IMPORTANT
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed mb-4">
                    Fitur bernilai tinggi yang menunjang operasional, performa SEO konten, dan kepatuhan analitik marketing.
                  </p>
                  <div className="space-y-2.5 flex-1">
                    {featuresPlanData.filter(f => f.prioritas === 'Should-Have').map(f => (
                      <div key={f.id} className="bg-white rounded-xl p-3 border border-orange-100 shadow-sm text-xs relative hover:-rotate-1 transition-all">
                        <div className="font-bold text-slate-800">{f.fitur}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{f.deskripsi}</div>
                        <div className="flex items-center gap-2 mt-2 pt-1.5 border-t border-slate-50">
                          <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-semibold">{f.kategori}</span>
                          <span className="text-[9px] text-slate-400 font-mono ml-auto">{f.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. NICE-TO-HAVE CANDIDATES */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col h-full shadow-sm">
                  <div className="flex items-center justify-between mb-3.5 border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">
                      ✨ KUADRAN 3: NICE-TO-HAVE
                    </span>
                    <span className="bg-slate-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      OPTIONAL
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed mb-4">
                    Fitur pelengkap ekstra guna memperkaya konversi promosi di masa ramai liburan sekolah.
                  </p>
                  <div className="space-y-2.5 flex-1">
                    {featuresPlanData.filter(f => f.prioritas === 'Nice-to-Have').map(f => (
                      <div key={f.id} className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm text-xs relative hover:scale-102 transition-all">
                        <div className="font-bold text-slate-800">{f.fitur}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{f.deskripsi}</div>
                        <div className="flex items-center gap-2 mt-2 pt-1.5 border-t border-slate-50">
                          <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-semibold">{f.kategori}</span>
                          <span className="text-[9px] text-slate-400 font-mono ml-auto">{f.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Architecture stack callouts */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <h3 className="text-md font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-orange-500 rounded-sm"></div>
                  Kebutuhan Teknologi & Integrasi Sistem (Tech Dependencies)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="font-bold text-slate-800">1. Client / Rendering</div>
                    <div className="text-slate-500 mt-1">React 19 dengan compiler Vite 6. Transisi antar-subpages memakai layout motion-effect halus.</div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="font-bold text-slate-800">2. CSS Utility</div>
                    <div className="text-slate-500 mt-1">Tailwind CSS 4. Presisi responsif dan border lekuk bulat besar untuk melembutkan visual card armada.</div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="font-bold text-slate-800">3. Redirect API</div>
                    <div className="text-slate-500 mt-1">WhatsApp API Link Generator (wa.me) dengan format string `%20` beralih mulus tanpa login eksternal.</div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="font-bold text-slate-800">4. Analytics Hub</div>
                    <div className="text-slate-500 mt-1">Pergerakan klik interaksi dicatat dinamis ke analytics state dan divisualisasikan via Recharts.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 4: ROLES & PERMISSIONS --- */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-2 h-5 bg-orange-500 rounded-sm"></div>
                  Struktur Peran Akun & Matriks Otorisasi Pengguna (Access Control Roles)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Mendefinisikan hak akses dan kapabilitas interaksi di website publik serta admin panel sesuai penugasan kerja.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Person 1: Pengunjung */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
                  <h4 className="text-md font-extrabold text-slate-800 flex items-center gap-1">
                    👥 Pengunjung Web
                  </h4>
                  <div className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider mt-1">Public Visitor</div>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed mt-2.5">
                    Calon pelanggan penyewa yang ingin menjelajahi dan membandingkan varian bus.
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs font-sans text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✔</span>
                      <span>Mencari & memfilter armada</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✔</span>
                      <span>Membaca artikel tips blog pariwisata</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✔</span>
                      <span>Mengisi Formulir Kontak Umum</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✔</span>
                      <span>Booking via WhatsApp API</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-500 font-semibold">
                      <span>❌</span>
                      <span>Akses Admin Dashboard</span>
                    </div>
                  </div>
                </div>

                {/* Person 2: Administrator */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-sky-500"></div>
                  <h4 className="text-md font-extrabold text-slate-800 flex items-center gap-1">
                    👑 Administrator
                  </h4>
                  <div className="text-[10px] uppercase font-bold text-sky-600 tracking-wider mt-1">Super Authority</div>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed mt-2.5">
                    Pemilik armada bus / kepala operasional sewa dengan kendali kontrol menyeluruh.
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs font-sans text-slate-600">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-600">
                      <span>✔</span>
                      <span>Akses penuh seluruh modular</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✔</span>
                      <span>Melakukan CRUD armada bus</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✔</span>
                      <span>Melakukan CRUD artikel blog</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✔</span>
                      <span>Manajemen Iklan Banner Promo</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✔</span>
                      <span>Membaca Inbox & Pantau Analytics</span>
                    </div>
                  </div>
                </div>

                {/* Person 3: Content Writer */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
                  <h4 className="text-md font-extrabold text-slate-800 flex items-center gap-1">
                    ✍ Content Creator
                  </h4>
                  <div className="text-[10px] uppercase font-bold text-orange-600 tracking-wider mt-1">Marketing Writer</div>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed mt-2.5">
                    Staf khusus bagian promosi, copywriting, and edukasi artikel wisata.
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs font-sans text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✔</span>
                      <span>Akses tab Blog Admin Panel</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✔</span>
                      <span>Menulis & edit draf tulisan</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-500">
                      <span>❌</span>
                      <span>Ubah inventory armada bus</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-500">
                      <span>❌</span>
                      <span>Kelola Banner Iklan Promo</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-500">
                      <span>❌</span>
                      <span>Melihat Inbox data pelanggan</span>
                    </div>
                  </div>
                </div>

                {/* Person 4: Customer Relations */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
                  <h4 className="text-md font-extrabold text-slate-800 flex items-center gap-1">
                    💬 Customer Service
                  </h4>
                  <div className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider mt-1">Sales & Relations</div>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed mt-2.5">
                    Staf penghubung calon penyewa, bertindak meladeni tanggapan inbox dan WA.
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs font-sans text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✔</span>
                      <span>Mendengarkan & review Inbox web</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✔</span>
                      <span>Menandai status pesan terbaca</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✔</span>
                      <span>Menerima rujukan chat WA Parised</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-500">
                      <span>❌</span>
                      <span>CRUD armada dan blog</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-500">
                      <span>❌</span>
                      <span>Ubah setelan sistem / server</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secure Roles Note */}
              <div className="mt-6 bg-slate-900 text-slate-100 rounded-2xl p-4 border border-slate-800 flex gap-3 text-xs items-start">
                <ShieldAlert className="text-orange-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-orange-400">Catatan Keamanan Arsitektur (Security Compliance)</span>
                  <p className="mt-1 text-slate-300 font-sans leading-relaxed">
                    Meskipun prototype ini memperbolehkan tim developer bersimulasi secara live menggunakan navigasi di atas secara instan, pada fase produksi sungguhan (production-ready stage), seluruh visual Admin Panel di atas mutlak wajib dilindungi oleh otentikasi JWT tokens, HTTPS secure cookies, dan enkripsi row-level security (RLS) di layer database (misalnya Firebase Rules / SQL Policies) demi kepatuhan perlindungan data pribadi konsumen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
