/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Terminal, 
  Github, 
  CloudLightning, 
  Cpu, 
  Layers, 
  Award, 
  Code, 
  Database, 
  Settings, 
  Copy, 
  Check, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Download, 
  User, 
  Phone, 
  Star, 
  BarChart3, 
  ExternalLink,
  GraduationCap,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { htmlTemplate } from "./htmlTemplate";

// Map keys to skills
const SKILL_KEYS = [
  'skill_computer_cli',
  'skill_github',
  'skill_vercel',
  'skill_chatgpt',
  'skill_gemini',
  'skill_claude',
  'skill_javascript'
] as const;

type SkillKey = typeof SKILL_KEYS[number];

interface SkillConfig {
  title: string;
  desc: string;
  icon: any;
  color: string;
  border: string;
  text: string;
  bg: string;
}

const SKILL_CONFIGS: Record<SkillKey, SkillConfig> = {
  'skill_computer_cli': {
    title: '១. ជំនាញកុំព្យូទ័រទូទៅ និង CLI',
    desc: 'ការប្រើប្រាស់កុំព្យូទ័រ ប្រព័ន្ធប្រតិបត្តិការ និងការវាយបញ្ជាពាក្យបញ្ជា (Command Line)',
    icon: Terminal,
    color: 'from-indigo-500 to-indigo-600',
    border: 'border-indigo-100',
    text: 'text-indigo-600',
    bg: 'bg-indigo-50/60'
  },
  'skill_github': {
    title: '២. GitHub (Version Control)',
    desc: 'ការគ្រប់គ្រងកូដ ការបង្កើត Repository ការ Commit និង Push កូដឡើងទៅ GitHub',
    icon: Github,
    color: 'from-sky-500 to-sky-600',
    border: 'border-sky-100',
    text: 'text-sky-600',
    bg: 'bg-sky-50/60'
  },
  'skill_vercel': {
    title: '៣. Vercel / Web Hosting',
    desc: 'ការបង្ហោះវេបសាយឱ្យដំណើរការជាសាធារណៈលើ Cloud Hosting (Vercel, Netlify)',
    icon: CloudLightning,
    color: 'from-emerald-500 to-emerald-600',
    border: 'border-emerald-100',
    text: 'text-emerald-600',
    bg: 'bg-emerald-50/60'
  },
  'skill_chatgpt': {
    title: '៤. ChatGPT',
    desc: 'ការសរសេរ Prompt ប្រើប្រាស់ ChatGPT ដើម្បីជួយគិតគំនិតច្នៃប្រឌិត និងសរសេរកូដ',
    icon: Cpu,
    color: 'from-amber-500 to-amber-600',
    border: 'border-amber-100',
    text: 'text-amber-600',
    bg: 'bg-amber-50/60'
  },
  'skill_gemini': {
    title: '៥. Gemini AI',
    desc: 'ការសរសេរ Prompt ប្រើប្រាស់ Gemini របស់ Google ក្នុងការអភិវឌ្ឍប្រព័ន្ធ',
    icon: Layers,
    color: 'from-rose-500 to-rose-600',
    border: 'border-rose-100',
    text: 'text-rose-600',
    bg: 'bg-rose-50/60'
  },
  'skill_claude': {
    title: '៦. Claude AI',
    desc: 'ការប្រើប្រាស់ Claude AI របស់ Anthropic ក្នុងការវិភាគកូដ និងបង្កើតដំណោះស្រាយ',
    icon: Award,
    color: 'from-violet-500 to-violet-600',
    border: 'border-violet-100',
    text: 'text-violet-600',
    bg: 'bg-violet-50/60'
  },
  'skill_javascript': {
    title: '៧. គ្រឹះនៃភាសា JavaScript',
    desc: 'ចំណេះដឹងទាក់ទងនឹងអថេរ, functions, arrays, ព្រឹត្តិការណ៍ និង DOM API',
    icon: Code,
    color: 'from-pink-500 to-pink-600',
    border: 'border-pink-100',
    text: 'text-pink-600',
    bg: 'bg-pink-50/60'
  }
};

interface Student {
  id?: string | number;
  full_name: string;
  phone_telegram: string;
  skill_computer_cli: number;
  skill_github: number;
  skill_vercel: number;
  skill_chatgpt: number;
  skill_gemini: number;
  skill_claude: number;
  skill_javascript: number;
}

const DEFAULT_MOCK_STUDENTS: Student[] = [
  { full_name: "សុខ ម៉ារី", phone_telegram: "012888999", skill_computer_cli: 4, skill_github: 3, skill_vercel: 2, skill_chatgpt: 5, skill_gemini: 4, skill_claude: 3, skill_javascript: 2 },
  { full_name: "លី ហួរ", phone_telegram: "015443322", skill_computer_cli: 5, skill_github: 5, skill_vercel: 4, skill_chatgpt: 4, skill_gemini: 3, skill_claude: 3, skill_javascript: 4 },
  { full_name: "គឹម ឡុង", phone_telegram: "099776655", skill_computer_cli: 2, skill_github: 1, skill_vercel: 1, skill_chatgpt: 3, skill_gemini: 2, skill_claude: 2, skill_javascript: 1 },
  { full_name: "ចាន់ សុភ័ក្រ", phone_telegram: "@sophakchan", skill_computer_cli: 3, skill_github: 2, skill_vercel: 2, skill_chatgpt: 4, skill_gemini: 4, skill_claude: 5, skill_javascript: 3 },
  { full_name: "ម៉ៅ ដានី", phone_telegram: "010556677", skill_computer_cli: 4, skill_github: 4, skill_vercel: 3, skill_chatgpt: 5, skill_gemini: 5, skill_claude: 4, skill_javascript: 3 }
];

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'form' | 'dashboard' | 'code'>('form');
  
  // Settings
  const [supabaseUrl, setSupabaseUrl] = useState<string>(() => localStorage.getItem("mini_app_supabase_url") || "");
  const [supabaseAnonKey, setSupabaseAnonKey] = useState<string>(() => localStorage.getItem("mini_app_supabase_anon_key") || "");
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isDbConnected, setIsDbConnected] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Data State
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Form Input States
  const [fullName, setFullName] = useState<string>("");
  const [phoneTelegram, setPhoneTelegram] = useState<string>("");
  const [formRatings, setFormRatings] = useState<Record<SkillKey, number>>({
    skill_computer_cli: 3,
    skill_github: 3,
    skill_vercel: 3,
    skill_chatgpt: 3,
    skill_gemini: 3,
    skill_claude: 3,
    skill_javascript: 3
  });

  // UI Notification States
  const [copied, setCopied] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: "" });

  // Initialize and Sync Database status
  useEffect(() => {
    if (supabaseUrl && supabaseAnonKey) {
      verifyDatabaseConnection(supabaseUrl, supabaseAnonKey);
    } else {
      loadSandboxData();
    }
  }, []);

  // Watch state changes to sync database/sandbox
  const isRealSupabase = supabaseUrl.trim() !== "" && supabaseAnonKey.trim() !== "";

  // Load local storage sandbox
  const loadSandboxData = () => {
    setIsLoading(true);
    const local = localStorage.getItem('mini_app_students');
    if (local) {
      setStudents(JSON.parse(local));
    } else {
      localStorage.setItem('mini_app_students', JSON.stringify(DEFAULT_MOCK_STUDENTS));
      setStudents(DEFAULT_MOCK_STUDENTS);
    }
    setIsLoading(false);
  };

  // Verify database connection using API Call
  const verifyDatabaseConnection = async (url: string, key: string) => {
    setIsVerifying(true);
    try {
      const trimmedUrl = url.trim().replace(/\/$/, "");
      const res = await fetch(`${trimmedUrl}/rest/v1/students?select=limit=1`, {
        method: "GET",
        headers: {
          "apikey": key.trim(),
          "Authorization": `Bearer ${key.trim()}`
        }
      });
      if (res.ok) {
        setIsDbConnected(true);
        // Load data from Supabase
        await fetchStudentsFromSupabase(trimmedUrl, key.trim());
      } else {
        setIsDbConnected(false);
        showNotification('error', 'ការភ្ជាប់ទៅ Supabase បរាជ័យ៖ សូមពិនិត្យមើល URL និង API Key របស់អ្នកម្តងទៀត!');
        loadSandboxData();
      }
    } catch (e) {
      setIsDbConnected(false);
      loadSandboxData();
    } finally {
      setIsVerifying(false);
    }
  };

  // Fetch students from Supabase
  const fetchStudentsFromSupabase = async (url: string, key: string) => {
    setIsLoading(true);
    try {
      const trimmedUrl = url.trim().replace(/\/$/, "");
      const res = await fetch(`${trimmedUrl}/rest/v1/students?select=*`, {
        method: "GET",
        headers: {
          "apikey": key.trim(),
          "Authorization": `Bearer ${key.trim()}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      } else {
        throw new Error("Cannot fetch students");
      }
    } catch (e) {
      showNotification('error', 'មានបញ្ហាក្នុងការទាញយកទិន្នន័យពី Cloud Database!');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger manual refresh
  const handleRefresh = async () => {
    if (isRealSupabase && isDbConnected) {
      await fetchStudentsFromSupabase(supabaseUrl, supabaseAnonKey);
      showNotification('success', 'ទិន្នន័យត្រូវបានទាញយកឡើងវិញពី Supabase ដោយជោគជ័យ!');
    } else {
      loadSandboxData();
      showNotification('success', 'ទិន្នន័យ Sandbox មូលដ្ឋានត្រូវបានផ្ទុកឡើងវិញ!');
    }
  };

  // Save Settings
  const handleSaveSettings = async () => {
    if (!supabaseUrl.trim() || !supabaseAnonKey.trim()) {
      // Clear settings
      localStorage.removeItem("mini_app_supabase_url");
      localStorage.removeItem("mini_app_supabase_anon_key");
      setSupabaseUrl("");
      setSupabaseAnonKey("");
      setIsDbConnected(false);
      showNotification('success', 'បានត្រលប់មកកាន់របៀបសាកល្បង (Sandbox Mode) វិញ!');
      loadSandboxData();
      setShowSettings(false);
      return;
    }

    localStorage.setItem("mini_app_supabase_url", supabaseUrl.trim());
    localStorage.setItem("mini_app_supabase_anon_key", supabaseAnonKey.trim());
    await verifyDatabaseConnection(supabaseUrl, supabaseAnonKey);
    setShowSettings(false);
  };

  // Clear Sandbox Data or reload default mockup
  const handleResetSandbox = () => {
    if (window.confirm("តើអ្នកចង់លុបទិន្នន័យសាកល្បងទាំងអស់មែនទេ? (ទិន្នន័យគំរូថ្មីនឹងត្រូវផ្ទុកឡើងវិញ)")) {
      localStorage.setItem('mini_app_students', JSON.stringify(DEFAULT_MOCK_STUDENTS));
      setStudents(DEFAULT_MOCK_STUDENTS);
      showNotification('success', 'បានសម្អាត និងកំណត់ទិន្នន័យសាកល្បងឡើងវិញ!');
    }
  };

  // Show dynamic banner notifications
  const showNotification = (type: 'success' | 'error', message: string) => {
    setAlertInfo({ type, message });
    setTimeout(() => {
      setAlertInfo({ type: null, message: "" });
    }, 5000);
  };

  // Form submit handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneTelegram.trim()) {
      showNotification('error', 'សូមបំពេញឈ្មោះ និងលេខទូរស័ព្ទ/Telegram របស់អ្នក!');
      return;
    }

    setIsSaving(true);

    const studentPayload: Student = {
      full_name: fullName.trim(),
      phone_telegram: phoneTelegram.trim(),
      skill_computer_cli: formRatings.skill_computer_cli,
      skill_github: formRatings.skill_github,
      skill_vercel: formRatings.skill_vercel,
      skill_chatgpt: formRatings.skill_chatgpt,
      skill_gemini: formRatings.skill_gemini,
      skill_claude: formRatings.skill_claude,
      skill_javascript: formRatings.skill_javascript
    };

    try {
      if (isRealSupabase && isDbConnected) {
        // Post directly using Fetch API to keep it aligned with the educational model
        const trimmedUrl = supabaseUrl.trim().replace(/\/$/, "");
        const res = await fetch(`${trimmedUrl}/rest/v1/students`, {
          method: 'POST',
          headers: {
            'apikey': supabaseAnonKey.trim(),
            'Authorization': `Bearer ${supabaseAnonKey.trim()}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(studentPayload)
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || 'Supabase API returns error');
        }

        showNotification('success', '🎉 ការចុះឈ្មោះចូលរៀនត្រូវបានរក្សាទុកក្នុង Supabase ដោយជោគជ័យ!');
        await fetchStudentsFromSupabase(supabaseUrl, supabaseAnonKey);
      } else {
        // Sandbox mode (localStorage)
        const local = JSON.parse(localStorage.getItem('mini_app_students') || '[]');
        local.push(studentPayload);
        localStorage.setItem('mini_app_students', JSON.stringify(local));
        
        // Push state
        setStudents([...students, studentPayload]);
        showNotification('success', '🎉 ចុះឈ្មោះបានជោគជ័យ! (រក្សាទុកក្នុង Sandbox គ្រឿងរបស់អ្នក)');
      }

      // Reset fields
      setFullName("");
      setPhoneTelegram("");
      setFormRatings({
        skill_computer_cli: 3,
        skill_github: 3,
        skill_vercel: 3,
        skill_chatgpt: 3,
        skill_gemini: 3,
        skill_claude: 3,
        skill_javascript: 3
      });

      // Switch to dashboard
      setActiveTab('dashboard');

    } catch (err: any) {
      console.error(err);
      showNotification('error', `មានបញ្ហាក្នុងការចុះឈ្មោះ៖ ${err.message || 'Error occurred'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Rating click handler
  const setRatingValue = (key: SkillKey, val: number) => {
    setFormRatings(prev => ({ ...prev, [key]: val }));
  };

  // Calculate Averages for the skills
  const calculatedAverages: Record<SkillKey, number> = SKILL_KEYS.reduce((acc, key) => {
    const total = students.reduce((sum, student) => sum + (Number(student[key]) || 0), 0);
    const average = students.length > 0 ? Number((total / students.length).toFixed(2)) : 0;
    acc[key] = average;
    return acc;
  }, {} as Record<SkillKey, number>);

  // Dynamic Template for displayed/exportable HTML
  const configuredHtml = htmlTemplate
    .replace('YOUR_SUPABASE_URL', supabaseUrl || 'YOUR_SUPABASE_URL')
    .replace('YOUR_SUPABASE_ANON_KEY', supabaseAnonKey || 'YOUR_SUPABASE_ANON_KEY');

  // Copy HTML script code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(configuredHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Trigger HTML download
  const handleDownloadFile = () => {
    const blob = new Blob([configuredHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Alert Notifications */}
      <AnimatePresence>
        {alertInfo.type && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className={`p-4 rounded-2xl shadow-xl flex items-start gap-3 border ${
              alertInfo.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-slate-700 shadow-emerald-100/50' 
                : 'bg-rose-50 border-rose-200 text-slate-700 shadow-rose-100/50'
            }`}>
              {alertInfo.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              )}
              <div className="text-sm">
                <span className={`font-bold block ${alertInfo.type === 'success' ? 'text-emerald-800' : 'text-rose-800'}`}>
                  {alertInfo.type === 'success' ? 'ប្រតិបត្តិការជោគជ័យ' : 'មានបញ្ហាខុសឆ្គង'}
                </span>
                <p className="mt-0.5 text-slate-600 leading-relaxed">{alertInfo.message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight">វគ្គសិក្សា "ការអភិវឌ្ឍ Mini App"</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                  វគ្គសិក្សាគ្រូ-សិស្ស
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">ប្រព័ន្ធចុះឈ្មោះ និងផ្ទាំងវិភាគទិន្នន័យសមត្ថភាពសិស្ស (Khmer UI)</p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* Connection Indicator */}
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isRealSupabase && isDbConnected
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100/60'
                  : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100/60'
              }`}
            >
              <Database className={`w-3.5 h-3.5 ${isRealSupabase && isDbConnected ? 'text-emerald-500' : 'text-amber-500'}`} />
              <span>{isRealSupabase && isDbConnected ? 'បានភ្ជាប់ Supabase' : 'Sandbox (ឡូកាល់)'}</span>
              <Settings className="w-3 h-3 text-slate-400" />
            </button>

            {/* Main Tabs */}
            <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200/50">
              <button 
                onClick={() => setActiveTab('form')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  activeTab === 'form' 
                    ? 'bg-white text-indigo-600 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ទម្រង់ចុះឈ្មោះ
              </button>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  activeTab === 'dashboard' 
                    ? 'bg-white text-indigo-600 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ផ្ទាំងវិភាគទិន្នន័យ
              </button>
              <button 
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'code' 
                    ? 'bg-white text-indigo-600 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>ទទួលបានកូដ HTML</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* Settings Drawer/Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-md p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-indigo-500" />
                  <h3 className="font-bold text-slate-950 text-sm">ការកំណត់ការតភ្ជាប់ Supabase Cloud Database</h3>
                </div>
                <span className="text-[10px] font-semibold text-slate-400">សម្រាប់ប្រើប្រាស់ Cloud Database</span>
              </div>
              
              <p className="text-xs text-slate-500 leading-relaxed">
                ដើម្បីតភ្ជាប់ទៅកាន់ Database ពិតប្រាកដ សូមបញ្ចូល **Supabase Project URL** និង **Anon API Key** របស់អ្នក។ 
                ទម្រង់ និងផ្ទាំងវិភាគទិន្នន័យនៅក្នុងវេបសាយនេះ នឹងកែប្រែទៅជាការផ្ញើ និងទាញទិន្នន័យពីគម្រោងរបស់អ្នកភ្លាមៗ! បើទទេ វានឹងដំណើរការក្នុងរបៀបសាកល្បង (Local Sandbox)។
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Supabase Project URL</label>
                  <input 
                    type="text" 
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://your-project.supabase.co" 
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Supabase Anon Key</label>
                  <input 
                    type="password" 
                    value={supabaseAnonKey}
                    onChange={(e) => setSupabaseAnonKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey..." 
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                <div className="flex gap-2">
                  {!isRealSupabase && (
                    <button 
                      type="button"
                      onClick={handleResetSandbox}
                      className="text-[11px] font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                    >
                      សម្អាតទិន្នន័យ Sandbox
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => setShowSettings(false)}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-800 px-4 py-2 transition-colors cursor-pointer"
                  >
                    បោះបង់
                  </button>
                  <button 
                    type="button" 
                    onClick={handleSaveSettings}
                    disabled={isVerifying}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold px-5 py-2 rounded-xl shadow-md transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {isVerifying ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Database className="w-3.5 h-3.5" />
                    )}
                    <span>រក្សាទុកព័ត៌មានភ្ជាប់</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SandBox vs Cloud Connection Banner */}
        {!isRealSupabase ? (
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="text-amber-500 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-700">
                <span className="font-bold text-amber-800 block mb-0.5">កំពុងដំណើរការក្នុងរបៀបសាកល្បង (Local Sandbox Mode)</span>
                កម្មវិធីកំពុងប្រើប្រាស់ <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-semibold text-[10px]">localStorage</code> នៃកម្មវិធីរុករកដើម្បីរក្សាទិន្នន័យសាកល្បង។ 
                ចុចប៊ូតុងខាងស្តាំ ដើម្បីបញ្ចូលព័ត៌មានតភ្ជាប់ទៅកាន់ **Supabase Cloud Database** ផ្ទាល់ខ្លួនរបស់អ្នក។
              </div>
            </div>
            <button 
              onClick={() => setShowSettings(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] px-4 py-2 rounded-xl transition-all shrink-0 cursor-pointer shadow-xs"
            >
              ភ្ជាប់ទៅ Supabase
            </button>
          </div>
        ) : (
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="text-emerald-500 shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-700">
                <span className="font-bold text-emerald-800 block mb-0.5">ភ្ជាប់ទៅកាន់ Supabase បានជោគជ័យ</span>
                រាល់ទិន្នន័យដែលបញ្ចូលក្នុងទម្រង់ចុះឈ្មោះនឹងត្រូវបានបញ្ចូល និងអានចេញពី Cloud Database របស់ Supabase ដោយស្វ័យប្រវត្ត។
              </div>
            </div>
            <button 
              onClick={() => setShowSettings(true)}
              className="text-slate-600 hover:text-slate-900 font-bold text-[11px] border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 rounded-xl transition-all shrink-0 cursor-pointer shadow-xs"
            >
              កែប្រែការកំណត់
            </button>
          </div>
        )}

        {/* Tab 1: Form View */}
        {activeTab === 'form' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form Left Side (2 cols) */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-5">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">ទម្រង់ចុះឈ្មោះ និងវាយតម្លៃសមត្ថភាពផ្ទាល់ខ្លួន</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  សូមបំពេញព័ត៌មានផ្ទាល់ខ្លួនខាងក្រោម និងវាយតម្លៃសមត្ថភាពយល់ដឹងលើមុខវិជ្ជានីមួយៗពី ១ ដល់ ៥ (១៖ មិនចេះសោះ, ៥៖ ចេះច្បាស់) ដើម្បីគណនាក្នុងក្រាហ្វិក។
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* Name & Contact Info Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-400" />
                      <span>ឈ្មោះពេញ <span className="text-rose-500">*</span></span>
                    </label>
                    <input 
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="ឧ. សុខ ជា"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/40 hover:bg-slate-50/80 transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span>លេខទូរស័ព្ទ ឬ Telegram ID <span className="text-rose-500">*</span></span>
                    </label>
                    <input 
                      type="text"
                      required
                      value={phoneTelegram}
                      onChange={(e) => setPhoneTelegram(e.target.value)}
                      placeholder="ឧ. 012 345 678 / @telegram_username"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/40 hover:bg-slate-50/80 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Rating blocks */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">វាយតម្លៃពិន្ទុជំនាញ Background (១ ដល់ ៥)</h3>
                  
                  {SKILL_KEYS.map((key) => {
                    const config = SKILL_CONFIGS[key];
                    const IconComp = config.icon;
                    const rating = formRatings[key];

                    return (
                      <div 
                        key={key}
                        className="p-4 rounded-2xl border border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-200 hover:bg-slate-50/50 transition-all"
                      >
                        <div className="flex items-start gap-3 max-w-md">
                          <div className={`p-2 rounded-xl ${config.bg} ${config.text} shrink-0`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 leading-snug">{config.title}</h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{config.desc}</p>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-1 sm:self-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRatingValue(key, star)}
                              className="p-1 hover:scale-115 transition-transform cursor-pointer"
                            >
                              <Star 
                                className={`w-5.5 h-5.5 transition-colors ${
                                  star <= rating 
                                    ? 'text-amber-400 fill-amber-400' 
                                    : 'text-slate-200 fill-none'
                                }`} 
                              />
                            </button>
                          ))}
                          
                          {/* Label rating */}
                          <span className="text-[11px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-lg min-w-[70px] text-center ml-2">
                            {rating} / 5
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-slate-100">
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-100 transition-all hover:shadow-indigo-200 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    {isSaving ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <Check className="w-5 h-5" />
                    )}
                    <span>ចុះឈ្មោះ និងបញ្ជូនព័ត៌មាន</span>
                  </button>
                </div>

              </form>
            </div>

            {/* Form Right Side Informational Card (1 col) */}
            <div className="space-y-6">
              
              {/* Educational Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Database className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">របៀបដំឡើង Supabase Database</h3>
                </div>
                
                <p className="text-xs text-slate-500 leading-relaxed">
                  គម្រោងនេះដំណើរការដោយផ្ទាល់ពីចំហៀង Client (Frontend) ទៅកាន់ Supabase តាមរយៈ **Fetch API**។ ដើម្បីទទួលបានទិន្នន័យពិតប្រាកដ សូមអនុវត្តតាមជំហាន៖
                </p>

                <ol className="text-xs text-slate-600 space-y-3 pl-4 list-decimal leading-relaxed">
                  <li>ចុះឈ្មោះគណនីឥតគិតថ្លៃនៅ <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold hover:underline inline-flex items-center gap-0.5">Supabase <ExternalLink className="w-3 h-3 inline" /></a> និងបង្កើតគម្រោងថ្មី។</li>
                  <li>ចូលទៅកាន់ **SQL Editor** ក្នុងផ្ទាំងគ្រប់គ្រងរបស់ Supabase។</li>
                  <li>ចម្លងកូដ SQL ខាងក្រោម ហើយចុច **Run** ដើម្បីបង្កើតតារាង <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-bold font-mono">students</code>៖</li>
                </ol>

                <div className="relative">
                  <pre className="bg-slate-900 text-indigo-300 text-[10px] p-3.5 rounded-2xl overflow-x-auto font-mono select-all shadow-inner leading-normal max-h-48">
{`create table students (
  id bigint generated always as identity primary key,
  created_at timestamp with time zone default now() not null,
  full_name text not null,
  phone_telegram text not null,
  skill_computer_cli integer not null,
  skill_github integer not null,
  skill_vercel integer not null,
  skill_chatgpt integer not null,
  skill_gemini integer not null,
  skill_claude integer not null,
  skill_javascript integer not null
);`}
                  </pre>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`create table students (\n  id bigint generated always as identity primary key,\n  created_at timestamp with time zone default now() not null,\n  full_name text not null,\n  phone_telegram text not null,\n  skill_computer_cli integer not null,\n  skill_github integer not null,\n  skill_vercel integer not null,\n  skill_chatgpt integer not null,\n  skill_gemini integer not null,\n  skill_claude integer not null,\n  skill_javascript integer not null\n);`);
                      showNotification('success', 'បានចម្លង SQL Script ជោគជ័យ!');
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                    title="Copy SQL"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] text-amber-600 leading-relaxed bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                    ⚠️ <strong>ចំណាំ៖</strong> ក្នុងគោលបំណងសិក្សា សូមបិទ **Row Level Security (RLS)** លើតារាង <code className="font-mono">students</code> ក្នុងផ្ទាំង Supabase (ឬសរសេរ Rule អនុញ្ញាតឱ្យសរសេរ និងអានដោយសេរី) ដើម្បីកុំឱ្យមានកំហុសបញ្ជូនទិន្នន័យ។
                  </p>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-indigo-900 text-white rounded-3xl p-6 shadow-xl shadow-indigo-950/10 relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                <h3 className="font-bold text-indigo-200 text-xs uppercase tracking-wider">ស្ថិតិសិស្សចុះឈ្មោះ</h3>
                
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tight">{students.length}</span>
                  <span className="text-sm text-indigo-200">នាក់</span>
                </div>

                <p className="text-xs text-indigo-200/80 mt-2 leading-relaxed">
                  ចំនួនសិស្សដែលបានចុះឈ្មោះបច្ចុប្បន្ន។ ទិន្នន័យត្រូវបានធ្វើបច្ចុប្បន្នភាពរាល់ពេលចុះឈ្មោះរួច។
                </p>

                <div className="pt-4 flex gap-2">
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="bg-white/15 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>មើលក្រាហ្វិកវិភាគ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Dashboard Analytics View */}
        {activeTab === 'dashboard' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-8">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-100 pb-5 gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">ផ្ទាំងវិភាគកម្រិតយល់ដឹងរួមរបស់សិស្ស (Aggregate Skill Dashboard)</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">គណនាមធ្យមភាគពិន្ទុ (ពី ១ ដល់ ៥) ចេញពីគ្រប់ទិន្នន័យសិស្សចុះឈ្មោះ ({students.length} នាក់)</p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Sync Data</span>
                </button>
              </div>
            </div>

            {/* Main Interactive Chart Grid (SVG Rendered) */}
            {students.length === 0 ? (
              <div className="py-16 text-center max-w-sm mx-auto space-y-4">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">មិនទាន់មានទិន្នន័យចុះឈ្មោះ</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    មិនទាន់មានសិស្សណាម្នាក់ចុះឈ្មោះក្នុងប្រព័ន្ធនៅឡើយទេ។ សូមទៅកាន់ «ទម្រង់ចុះឈ្មោះ» ដើម្បីបំពេញព័ត៌មានដំបូងបង្អស់។
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('form')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all cursor-pointer"
                >
                  ចុះឈ្មោះឥឡូវនេះ
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                
                {/* Responsive SVG Bar Chart */}
                <div className="bg-slate-50/50 p-4 sm:p-6 rounded-3xl border border-slate-100">
                  <div className="relative w-full h-80 sm:h-96 flex items-end justify-between pt-10 pb-6 gap-2 sm:gap-6 px-2 sm:px-6">
                    
                    {/* Background Y-Axis Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 font-medium">
                      {[5, 4, 3, 2, 1, 0].map((tick) => (
                        <div key={tick} className="w-full flex items-center gap-2 h-0">
                          <span className="w-6 text-right shrink-0">{tick}.0</span>
                          <div className="flex-grow border-t border-dashed border-slate-200"></div>
                        </div>
                      ))}
                    </div>

                    {/* Chart Bars */}
                    {SKILL_KEYS.map((key) => {
                      const avg = calculatedAverages[key];
                      const config = SKILL_CONFIGS[key];
                      const heightPercent = (avg / 5) * 100;

                      return (
                        <div key={key} className="flex-grow flex flex-col items-center group relative h-full justify-end z-10">
                          
                          {/* Value bubble on top of bar on hover */}
                          <div className="absolute -top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg -translate-y-full pointer-events-none shadow-md z-30 whitespace-nowrap">
                            ពិន្ទុមធ្យម៖ {avg} / ៥.០០
                          </div>

                          {/* Value printed permanently above the bar */}
                          <span className="text-xs font-extrabold text-slate-700 mb-2">{avg}</span>

                          {/* The Bar */}
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPercent}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`w-5 sm:w-10 rounded-t-xl bg-gradient-to-t ${config.color} shadow-sm group-hover:brightness-105 transition-all relative overflow-hidden`}
                          >
                            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10"></div>
                          </motion.div>

                          {/* Simplified label below chart */}
                          <span className="text-[10px] sm:text-xs font-bold text-slate-600 mt-3 hidden sm:inline whitespace-nowrap">
                            {key === 'skill_computer_cli' ? 'កុំព្យូទ័រ & CLI' :
                             key === 'skill_github' ? 'GitHub' :
                             key === 'skill_vercel' ? 'Vercel Hosting' :
                             key === 'skill_chatgpt' ? 'ChatGPT' :
                             key === 'skill_gemini' ? 'Gemini AI' :
                             key === 'skill_claude' ? 'Claude AI' : 'JavaScript'}
                          </span>
                          <span className="text-[9px] font-bold text-slate-600 mt-3 inline sm:hidden">
                            {key === 'skill_computer_cli' ? 'CLI' :
                             key === 'skill_github' ? 'Git' :
                             key === 'skill_vercel' ? 'Host' :
                             key === 'skill_chatgpt' ? 'GPT' :
                             key === 'skill_gemini' ? 'Gem' :
                             key === 'skill_claude' ? 'Cld' : 'JS'}
                          </span>
                        </div>
                      );
                    })}

                  </div>
                </div>

                {/* Info and color blocks for scoring categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-1.5 text-rose-600 font-bold text-xs mb-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span>ពិន្ទុចន្លោះ ១.០ - ២.៥ (មូលដ្ឋានគ្រឹះ)</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      តំណាងឱ្យសិស្សដែលទើបតែចាប់ផ្តើមដំបូងបង្អស់។ ត្រូវការការពន្យល់លម្អិត និងការណែនាំជាជំហានៗដើម្បីធានាថាពួកគាត់មិនដើរយឺតជាងមិត្តរួមថ្នាក់ដទៃទៀត។
                    </p>
                  </div>

                  <div className="p-4.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs mb-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      <span>ពិន្ទុចន្លោះ ២.៦ - ៤.០ (បង្គួរ / មធ្យម)</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      តំណាងឱ្យសិស្សដែលមានចំណេះដឹងបង្គួរ អាចប្រើប្រាស់ និងសាកល្បងដោយខ្លួនឯងខ្លះៗ។ ងាយស្រួលយល់ និងរៀនសរសេរកម្មវិធីថ្មីៗបានលឿន។
                    </p>
                  </div>

                  <div className="p-4.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>ពិន្ទុចន្លោះ ៤.១ - ៥.០ (កម្រិតខ្ពស់)</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      សិស្សដែលមានសមត្ថភាពរឹងមាំ និងឆ្លងកាត់ការអនុវត្តច្រើនរួចទៅហើយ។ អាចត្រូវបានចាត់តាំងឱ្យជួយពន្យល់ និងគាំទ្រសិស្សដទៃទៀតក្នុងក្រុម (Peer Learning)។
                    </p>
                  </div>
                </div>

                {/* Student register log (for educational inspection) */}
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-sm text-slate-900">បញ្ជីសិស្សចុះឈ្មោះ ({students.length} នាក់)</h3>
                    <span className="text-[10px] text-slate-400 font-medium">ចុះបញ្ជីតាមលំដាប់លំដោយ</span>
                  </div>

                  <div className="border border-slate-100 rounded-2xl overflow-x-auto shadow-xs">
                    <table className="w-full text-xs text-left text-slate-500">
                      <thead className="text-[10px] text-slate-700 uppercase bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="px-4 py-3 font-bold">ឈ្មោះសិស្ស</th>
                          <th className="px-4 py-3 font-bold">លេខទូរស័ព្ទ / Telegram</th>
                          <th className="px-3 py-3 text-center font-bold">CLI</th>
                          <th className="px-3 py-3 text-center font-bold">Git</th>
                          <th className="px-3 py-3 text-center font-bold">Host</th>
                          <th className="px-3 py-3 text-center font-bold">GPT</th>
                          <th className="px-3 py-3 text-center font-bold">Gemini</th>
                          <th className="px-3 py-3 text-center font-bold">Claude</th>
                          <th className="px-3 py-3 text-center font-bold">JS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {students.slice().reverse().map((student, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-4 py-3 font-bold text-slate-900">{student.full_name}</td>
                            <td className="px-4 py-3 font-mono text-slate-600">{student.phone_telegram}</td>
                            <td className="px-3 py-3 text-center font-bold text-indigo-600 bg-indigo-50/10">{student.skill_computer_cli}/5</td>
                            <td className="px-3 py-3 text-center font-bold text-sky-600 bg-sky-50/10">{student.skill_github}/5</td>
                            <td className="px-3 py-3 text-center font-bold text-emerald-600 bg-emerald-50/10">{student.skill_vercel}/5</td>
                            <td className="px-3 py-3 text-center font-bold text-amber-600 bg-amber-50/10">{student.skill_chatgpt}/5</td>
                            <td className="px-3 py-3 text-center font-bold text-rose-600 bg-rose-50/10">{student.skill_gemini}/5</td>
                            <td className="px-3 py-3 text-center font-bold text-violet-600 bg-violet-50/10">{student.skill_claude}/5</td>
                            <td className="px-3 py-3 text-center font-bold text-pink-600 bg-pink-50/10">{student.skill_javascript}/5</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* Tab 3: Code Export Hub */}
        {activeTab === 'code' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left side: Export Panel and Explanations */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-5">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">ទទួលបានឯកសារតែមួយគត់ (Single-file HTML Component)</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  ខាងក្រោមជាកូដ HTML ពេញលេញដែលត្រូវបានរចនាឡើងយ៉ាងយកចិត្តទុកដាក់។ វាផ្ទុកទាំងស្រុងនូវ HTML, CSS (Tailwind CDN), JavaScript និង Chart.js (CDN)។
                </p>
              </div>

              {/* Dynamic code configurator alert */}
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-xs text-slate-600 leading-relaxed">
                💡 <strong>មុខងារពិសេស (Smart Configurator):</strong> ប្រសិនបើអ្នកបានបញ្ចូល Supabase URL និង Anon API Key របស់អ្នកនៅក្នុងផ្នែកការកំណត់ (Settings Drawer) កូដ HTML ខាងក្រោមនឹងត្រូវបានធ្វើបច្ចុប្បន្នភាពជំនួសឱ្យតម្លៃស្វ័យប្រវត្ត។ អ្នកអាចចម្លង ឬទាញយកវាទៅប្រើប្រាស់បានភ្លាមៗ ដោយមិនបាច់កែសម្រួលម្តងទៀតទេ!
              </div>

              {/* Preview of Code Container */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-indigo-500" />
                    <span>index.html (HTML + CSS + Vanilla JS)</span>
                  </span>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-[10px] sm:text-xs transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{copied ? 'បានចម្លង!' : 'ចម្លងកូដ'}</span>
                    </button>
                    <button 
                      onClick={handleDownloadFile}
                      className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] sm:text-xs transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ទាញយក index.html</span>
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <textarea 
                    readOnly
                    value={configuredHtml}
                    className="w-full h-96 p-4 bg-slate-900 text-indigo-200 rounded-2xl border-none focus:ring-0 font-mono text-[11px] leading-relaxed select-all"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none rounded-b-2xl"></div>
                </div>
              </div>

              {/* Deployment Instructions */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">របៀបបង្ហោះវេបសាយលើ GitHub Pages</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-xs mb-2">1</span>
                    <span className="font-bold text-slate-900 block">បង្កើត Repository</span>
                    <p className="text-[11px] text-slate-500 mt-1">ចូលទៅកាន់ GitHub បង្កើត Repository ថ្មីមួយ (ឧ. <code className="bg-slate-100 px-1 rounded">mini-app-dashboard</code>) ជា Public។</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-xs mb-2">2</span>
                    <span className="font-bold text-slate-900 block">រក្សាទុកឯកសារ</span>
                    <p className="text-[11px] text-slate-500 mt-1">ទាញយកឯកសារ <code className="bg-slate-100 px-1 rounded font-mono">index.html</code> នេះ ហើយបញ្ចូល (Push) វាទៅកាន់ Repository របស់អ្នក។</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-xs mb-2">3</span>
                    <span className="font-bold text-slate-900 block">បើកដំណើរការ Pages</span>
                    <p className="text-[11px] text-slate-500 mt-1">ទៅកាន់ Settings {"->"} Pages របស់ Repo ជ្រើសរើស Branch <code className="bg-slate-100 px-1 rounded">main</code> រួចចុច Save។ ជាការស្រេច!</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right side: Explanations of Supabase & Fetch architecture */}
            <div className="space-y-6">
              
              {/* How Fetch API works in this code */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Database className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">យន្តការ Fetch API & Supabase</h3>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  ឯកសារ HTML នេះមិនប្រើប្រាស់ Supabase npm SDK ឡើយ ដើម្បីផ្តល់ភាពងាយស្រួលដល់ការយល់ដឹងរបស់សិស្សទើបនឹងរៀនដំបូង។ ផ្ទុយទៅវិញ វាប្រាស្រ័យទាក់ទងជាមួយ Supabase តាមរយៈ **HTTP Fetch API**៖
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">1. ការបន្ថែមទិន្នន័យ (POST)៖</span>
                    <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
                      ផ្ញើ HTTP POST ទៅកាន់ <code className="bg-slate-50 p-0.5 rounded font-mono text-indigo-600 text-[10px]">/rest/v1/students</code> ជាមួយ Header <code className="bg-slate-50 p-0.5 rounded font-mono text-slate-600 text-[10px]">apikey</code> និង Body ជាទិន្នន័យ JSON។
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block">2. ការទាញយកទិន្នន័យ (GET)៖</span>
                    <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
                      ផ្ញើ HTTP GET ទៅកាន់ <code className="bg-slate-50 p-0.5 rounded font-mono text-indigo-600 text-[10px]">/rest/v1/students?select=*</code> ដើម្បីទទួលបានសន្លឹកទិន្នន័យសិស្សទាំងអស់មកវិញ និងធ្វើការគណនាមធ្យមភាគពិន្ទុភ្លាមៗ។
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-100 rounded-2xl text-[11px] text-amber-700 leading-normal">
                  📌 <strong>គន្លឹះបង្រៀន (Educational Tip)៖</strong> ការប្រើប្រាស់ Fetch API បែបនេះ ជួយឱ្យសិស្សយល់ច្បាស់ពីប្រព័ន្ធ HTTP Requests, Headers, Method, Status codes, និង JSON formats ដែលជាគ្រឹះដ៏សំខាន់សម្រាប់ការសរសេរកូដជំនាន់ក្រោយ។
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Main Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 វគ្គសិក្សា Mini App Development. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 font-semibold text-slate-500">
              Kantumruy Pro Font
            </span>
            <span>|</span>
            <span>Tailwind CSS & Chart.js</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
