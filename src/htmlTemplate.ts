export const htmlTemplate = `<!DOCTYPE html>
<html lang="km">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ប្រព័ន្ធចុះឈ្មោះ និងវិភាគទិន្នន័យសិស្ស - Mini App Development</title>
    <!-- Tailwind CSS v3 via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Font: Kantumruy Pro for Khmer & Inter for English -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,300..700;1,300..700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Chart.js via CDN -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: "Kantumruy Pro", "Inter", sans-serif;
            background-color: #f8fafc;
        }
        /* Custom scrollbar for better styling */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
    </style>
</head>
<body class="min-h-screen text-slate-800 flex flex-col">

    <!-- Header Navigation Bar -->
    <header class="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-30">
        <div class="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <div class="p-2.5 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <div>
                    <h1 class="font-bold text-lg text-slate-900 tracking-tight">វគ្គសិក្សា "ការអភិវឌ្ឍ Mini App"</h1>
                    <p class="text-xs text-slate-500 font-medium">ប្រព័ន្ធចុះឈ្មោះ និងផ្ទាំងវិភាគទិន្នន័យសមត្ថភាពសិស្ស</p>
                </div>
            </div>
            
            <!-- Tab Buttons -->
            <div class="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60">
                <button id="tab-register-btn" onclick="switchTab('register')" class="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 bg-white text-indigo-600 shadow-sm">
                    ទម្រង់ចុះឈ្មោះ
                </button>
                <button id="tab-dashboard-btn" onclick="switchTab('dashboard')" class="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 text-slate-600 hover:text-slate-900">
                    ផ្ទាំងវិភាគទិន្នន័យ
                </button>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
        
        <!-- SandBox Banner Indicator -->
        <div id="sandbox-banner" class="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 shadow-sm">
            <div class="text-amber-500 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <div class="text-sm text-slate-700">
                <span class="font-bold text-amber-800">របៀបសាកល្បង (Local Sandbox Mode):</span> 
                បច្ចុប្បន្ន កម្មវិធីកំពុងរក្សាទុកទិន្នន័យនៅក្នុង <code class="font-mono bg-amber-100 px-1 rounded text-amber-900 font-semibold text-xs">localStorage</code> នៃកម្មវិធីរុករករបស់អ្នក។ 
                ដើម្បីភ្ជាប់ទៅកាន់ Supabase database ពិតប្រាកដ សូមកែប្រែកូដនៅក្នុងឯកសារនេះត្រង់ចំណុច <code class="font-mono bg-amber-100 px-1 rounded text-amber-900 font-semibold text-xs">SUPABASE_URL</code> និង <code class="font-mono bg-amber-100 px-1 rounded text-amber-900 font-semibold text-xs">SUPABASE_ANON_KEY</code>។
            </div>
        </div>

        <!-- Connection Success Banner -->
        <div id="connected-banner" class="hidden mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 shadow-sm">
            <div class="text-emerald-500 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            </div>
            <div class="text-sm text-slate-700">
                <span class="font-bold text-emerald-800">ការតភ្ជាប់បានជោគជ័យ:</span> 
                កម្មវិធីកំពុងភ្ជាប់ទៅកាន់ <span class="font-bold text-emerald-900">Supabase Database</span> ដោយជោគជ័យ។ រាល់ទិន្នន័យដែលបញ្ចូលនឹងត្រូវបានរក្សាទុកក្នុង Cloud Database ភ្លាមៗ!
            </div>
        </div>

        <!-- TAB 1: REGISTRATION FORM -->
        <section id="tab-register-view" class="block">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <!-- Registration Form Container (2 cols on large screen) -->
                <div class="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                    <div class="border-b border-slate-100 pb-5 mb-6">
                        <h2 class="text-xl font-bold text-slate-900">ទម្រង់ចុះឈ្មោះ និងវាយតម្លៃសមត្ថភាព</h2>
                        <p class="text-sm text-slate-500 mt-1">សូមបំពេញព័ត៌មានខាងក្រោម និងជ្រើសរើសកម្រិតយល់ដឹងរបស់អ្នកចំពោះមុខវិជ្ជានីមួយៗពី ១ (មិនចេះទាល់តែសោះ) ដល់ ៥ (ស្ទាត់ជំនាញ)</p>
                    </div>

                    <form id="registration-form" onsubmit="handleFormSubmit(event)" class="space-y-6">
                        <!-- Personal Info Grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label for="fullName" class="block text-sm font-semibold text-slate-700 mb-1.5">ឈ្មោះពេញ <span class="text-rose-500">*</span></label>
                                <input type="text" id="fullName" required placeholder="ឧ. សុខ ជា" 
                                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50 hover:bg-slate-50 transition-colors text-sm">
                            </div>
                            <div>
                                <label for="phoneTelegram" class="block text-sm font-semibold text-slate-700 mb-1.5">លេខទូរស័ព្ទ ឬ Telegram <span class="text-rose-500">*</span></label>
                                <input type="text" id="phoneTelegram" required placeholder="ឧ. 012 345 678 / @username" 
                                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50 hover:bg-slate-50 transition-colors text-sm">
                            </div>
                        </div>

                        <!-- Skill Checklist Ratings Section -->
                        <div class="space-y-5 pt-4">
                            <h3 class="text-sm font-bold text-slate-950 uppercase tracking-wider border-b border-slate-100 pb-2">ការវាយតម្លៃជំនាញផ្ទាល់ខ្លួន (Background Skills)</h3>
                            
                            <!-- Skill Items -->
                            <div class="space-y-4">
                                <!-- Skill 1 -->
                                <div class="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-200/80 transition-colors">
                                    <div class="max-w-md">
                                        <h4 class="font-bold text-sm text-slate-900">១. ជំនាញកុំព្យូទ័រទូទៅ និង CLI</h4>
                                        <p class="text-xs text-slate-500 mt-0.5">ការប្រើប្រាស់កុំព្យូទ័រ ប្រព័ន្ធប្រតិបត្តិការ និងការវាយបញ្ជាពាក្យបញ្ជា (Command Line)</p>
                                    </div>
                                    <div class="flex items-center gap-1.5" id="rating-container-skill_computer_cli">
                                        <!-- Stars will be injected by JavaScript -->
                                    </div>
                                </div>

                                <!-- Skill 2 -->
                                <div class="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-200/80 transition-colors">
                                    <div class="max-w-md">
                                        <h4 class="font-bold text-sm text-slate-900">២. GitHub (Version Control)</h4>
                                        <p class="text-xs text-slate-500 mt-0.5">ការគ្រប់គ្រងកូដ ការបង្កើត Repository ការ Commit និង Push កូដឡើងទៅ GitHub</p>
                                    </div>
                                    <div class="flex items-center gap-1.5" id="rating-container-skill_github">
                                        <!-- Stars will be injected by JavaScript -->
                                    </div>
                                </div>

                                <!-- Skill 3 -->
                                <div class="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-200/80 transition-colors">
                                    <div class="max-w-md">
                                        <h4 class="font-bold text-sm text-slate-900">៣. Vercel / Web Hosting</h4>
                                        <p class="text-xs text-slate-500 mt-0.5">ការបង្ហោះវេបសាយឱ្យដំណើរការជាសាធារណៈលើ Cloud Hosting (Vercel, Netlify ល។)</p>
                                    </div>
                                    <div class="flex items-center gap-1.5" id="rating-container-skill_vercel">
                                        <!-- Stars will be injected by JavaScript -->
                                    </div>
                                </div>

                                <!-- Skill 4 -->
                                <div class="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-200/80 transition-colors">
                                    <div class="max-w-md">
                                        <h4 class="font-bold text-sm text-slate-900">៤. ChatGPT</h4>
                                        <p class="text-xs text-slate-500 mt-0.5">ការសរសេរ Prompt ប្រើប្រាស់ ChatGPT ដើម្បីជួយគិតគំនិតច្នៃប្រឌិត និងសរសេរកូដ</p>
                                    </div>
                                    <div class="flex items-center gap-1.5" id="rating-container-skill_chatgpt">
                                        <!-- Stars will be injected by JavaScript -->
                                    </div>
                                </div>

                                <!-- Skill 5 -->
                                <div class="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-200/80 transition-colors">
                                    <div class="max-w-md">
                                        <h4 class="font-bold text-sm text-slate-900">៥. Gemini AI</h4>
                                        <p class="text-xs text-slate-500 mt-0.5">ការសរសេរ Prompt ប្រើប្រាស់ Gemini របស់ Google ក្នុងការអភិវឌ្ឍប្រព័ន្ធ</p>
                                    </div>
                                    <div class="flex items-center gap-1.5" id="rating-container-skill_gemini">
                                        <!-- Stars will be injected by JavaScript -->
                                    </div>
                                </div>

                                <!-- Skill 6 -->
                                <div class="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-200/80 transition-colors">
                                    <div class="max-w-md">
                                        <h4 class="font-bold text-sm text-slate-900">៦. Claude AI</h4>
                                        <p class="text-xs text-slate-500 mt-0.5">ការប្រើប្រាស់ Claude AI របស់ Anthropic ក្នុងការវិភាគកូដ និងបង្កើតដំណោះស្រាយ</p>
                                    </div>
                                    <div class="flex items-center gap-1.5" id="rating-container-skill_claude">
                                        <!-- Stars will be injected by JavaScript -->
                                    </div>
                                </div>

                                <!-- Skill 7 -->
                                <div class="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-200/80 transition-colors">
                                    <div class="max-w-md">
                                        <h4 class="font-bold text-sm text-slate-900">៧. គ្រឹះនៃភាសា JavaScript</h4>
                                        <p class="text-xs text-slate-500 mt-0.5">ចំណេះដឹងទាក់ទងនឹងអថេរ (Variables), functions, arrays, ព្រឹត្តិការណ៍ (Events), និង DOM API</p>
                                    </div>
                                    <div class="flex items-center gap-1.5" id="rating-container-skill_javascript">
                                        <!-- Stars will be injected by JavaScript -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div class="pt-4">
                            <button type="submit" id="submit-btn" class="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-100 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                <span>ចុះឈ្មោះចូលរៀនឥឡូវនេះ</span>
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Setup Info / Quick Explanation Box (1 col) -->
                <div class="space-y-6">
                    <!-- Instruction Card -->
                    <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                        <h3 class="font-bold text-slate-900 flex items-center gap-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>អំពីកម្មវិធី និងការតភ្ជាប់</span>
                        </h3>
                        <p class="text-xs text-slate-500 mt-2.5 leading-relaxed">
                            កម្មវិធីនេះជាគម្រោងគំរូអប់រំសម្រាប់សិស្សរៀនបង្កើត Mini App។ វាបង្ហាញពីរបៀបប្រើប្រាស់ **Vanilla JS Fetch API** ដើម្បីផ្ញើ និងទទួលទិន្នន័យផ្ទាល់ពី Cloud Database ដោយមិនប្រើ SDK ឬ Server-side proxy ឡើយ។
                        </p>
                        
                        <div class="mt-4 pt-4 border-t border-slate-100 space-y-2">
                            <span class="text-xs font-bold text-slate-800 block">របៀបបង្កើតតារាងក្នុង Supabase:</span>
                            <p class="text-[11px] text-slate-500 leading-relaxed">
                                សូមចូលទៅកាន់ Supabase SQL Editor ហើយដំណើរការកូដខាងក្រោម ដើម្បីបង្កើតតារាងសម្រាប់ទទួលទិន្នន័យ៖
                            </p>
                            <pre class="bg-slate-900 text-indigo-300 text-[10px] p-3 rounded-lg overflow-x-auto font-mono mt-2 select-all shadow-inner">
create table students (
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
);</pre>
                        </div>
                    </div>

                    <!-- Database Quick Stats -->
                    <div class="bg-indigo-900 text-white rounded-3xl p-6 shadow-xl shadow-indigo-900/10 relative overflow-hidden">
                        <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                        <h3 class="font-bold text-indigo-200 text-xs uppercase tracking-wider">ស្ថិតិការចុះឈ្មោះបច្ចុប្បន្ន</h3>
                        <div class="mt-4 flex items-baseline gap-2">
                            <span id="student-count-badge" class="text-4xl font-extrabold tracking-tight">0</span>
                            <span class="text-sm font-semibold text-indigo-200">នាក់</span>
                        </div>
                        <p class="text-xs text-indigo-200/80 mt-2 leading-relaxed">
                            ចំនួនសិស្សដែលបានចុះឈ្មោះ និងចូលរួមវាយតម្លៃផ្ទាល់។ ទិន្នន័យនេះនឹងធ្វើបច្ចុប្បន្នភាពដោយស្វ័យប្រវត្ត។
                        </p>
                        <button onclick="switchTab('dashboard')" class="mt-4 inline-flex items-center gap-1 text-xs font-bold text-white bg-white/15 hover:bg-white/20 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer">
                            <span>មើលក្រាហ្វិកវិភាគ</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </section>

        <!-- TAB 2: ANALYTICS DASHBOARD -->
        <section id="tab-dashboard-view" class="hidden">
            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-8">
                
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-100 pb-5 gap-4">
                    <div>
                        <h2 class="text-xl font-bold text-slate-900">ផ្ទាំងវិភាគកម្រិតជំនាញសិស្សរួម (Aggregate Skill Analytics)</h2>
                        <p class="text-sm text-slate-500 mt-1">ក្រាហ្វបង្ហាញពីមធ្យមភាគពិន្ទុជំនាញ (ពី ១ ដល់ ៥) ដែលគណនាចេញពីគ្រប់សិស្សដែលបានចុះឈ្មោះ</p>
                    </div>

                    <!-- Sync / Refresh Button -->
                    <button onclick="fetchAndDisplayAnalytics()" class="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl transition-all text-xs cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18" />
                        </svg>
                        <span>ទាញយកឡើងវិញ (Sync Data)</span>
                    </button>
                </div>

                <!-- Empty State -->
                <div id="chart-empty-state" class="hidden py-16 flex flex-col items-center justify-center text-center">
                    <div class="p-4 bg-slate-50 rounded-2xl text-slate-400 mb-4 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 class="font-bold text-slate-800 text-sm">មិនទាន់មានទិន្នន័យនៅឡើយទេ</h3>
                    <p class="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
                        មិនទាន់មានសិស្សណាម្នាក់ចុះឈ្មោះក្នុងប្រព័ន្ធនៅឡើយទេ។ សូមទៅកាន់ទំព័រ «ទម្រង់ចុះឈ្មោះ» ដើម្បីបញ្ចូលសិស្សដំបូង។
                    </p>
                    <button onclick="switchTab('register')" class="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all">
                        ទៅកាន់ទម្រង់ចុះឈ្មោះ
                    </button>
                </div>

                <!-- Chart Wrapper -->
                <div id="chart-card" class="relative w-full max-w-4xl mx-auto h-[350px] sm:h-[400px]">
                    <canvas id="skillsChart"></canvas>
                </div>

                <!-- Score Level Explanations Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 border-t border-slate-100">
                    <div class="p-4 bg-slate-50 rounded-2xl">
                        <div class="font-bold text-xs text-rose-600 mb-1 flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            <span>ពិន្ទុចន្លោះ ១.០ - ២.៥</span>
                        </div>
                        <span class="text-xs font-bold text-slate-800">កម្រិតមូលដ្ឋានគ្រឹះ / ទើបចាប់ផ្តើម</span>
                        <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">ត្រូវការការណែនាំ និងការពន្យល់ជាជំហានៗលម្អិតពីគ្រូបង្គោល និងការអនុវត្តបន្ថែមច្រើន។</p>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl">
                        <div class="font-bold text-xs text-indigo-600 mb-1 flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                            <span>ពិន្ទុចន្លោះ ២.៦ - ៤.០</span>
                        </div>
                        <span class="text-xs font-bold text-slate-800">កម្រិតបង្គួរ / អាចប្រើការបាន</span>
                        <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">មានសមត្ថភាពខ្លះៗរួចជាស្រេច អាចឈ្វេងយល់ពីមេរៀនលឿន និងស្វែងយល់បន្ថែមដោយខ្លួនឯងបាន។</p>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl">
                        <div class="font-bold text-xs text-emerald-600 mb-1 flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>ពិន្ទុចន្លោះ ៤.១ - ៥.០</span>
                        </div>
                        <span class="text-xs font-bold text-slate-800">កម្រិតខ្ពស់ / ស្ទាត់ជំនាញ</span>
                        <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">មានសមត្ថភាពរឹងមាំខ្លាំង អាចធ្វើការស្រាវជ្រាវដោយឯករាជ្យ និងជួយណែនាំដល់មិត្តរួមថ្នាក់ដទៃទៀត។</p>
                    </div>
                </div>

            </div>
        </section>

    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400 mt-12">
        <div class="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© 2026 វគ្គសិក្សា Mini App Development. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
            <p>បង្កើតឡើងសម្រាប់គោលបំណងអប់រំ និងបណ្តុះបណ្តាល</p>
        </div>
    </footer>

    <!-- Vanilla Javascript Logic -->
    <script>
        // ==================== SUPABASE CONFIGURATION ====================
        // 1. Create a Supabase account at https://supabase.com
        // 2. Create a new project and go to SQL Editor -> Paste the SQL query from instruction card
        // 3. Go to Project Settings -> API, copy Project URL and anon key
        // 4. Update the values below to connect your real Database:
        const SUPABASE_URL = "YOUR_SUPABASE_URL"; // Paste Supabase Project URL here
        const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY"; // Paste API Anon Key here
        // ================================================================

        // Skill keys mapping to match our database columns
        const SKILL_KEYS = [
            'skill_computer_cli',
            'skill_github',
            'skill_vercel',
            'skill_chatgpt',
            'skill_gemini',
            'skill_claude',
            'skill_javascript'
        ];

        // Skill display labels in Khmer
        const SKILL_LABELS = {
            'skill_computer_cli': 'កុំព្យូទ័រ & CLI',
            'skill_github': 'GitHub',
            'skill_vercel': 'Vercel Hosting',
            'skill_chatgpt': 'ChatGPT',
            'skill_gemini': 'Gemini AI',
            'skill_claude': 'Claude AI',
            'skill_javascript': 'JavaScript'
        };

        // Current state
        let ratings = {
            skill_computer_cli: 3,
            skill_github: 3,
            skill_vercel: 3,
            skill_chatgpt: 3,
            skill_gemini: 3,
            skill_claude: 3,
            skill_javascript: 3
        };

        let chartInstance = null;
        let isRealSupabase = false;

        // Initialize App on DOM Content Loaded
        document.addEventListener("DOMContentLoaded", function() {
            // Check if user has replaced placeholder credentials with real ones
            if (SUPABASE_URL && SUPABASE_URL !== "YOUR_SUPABASE_URL" && SUPABASE_URL.trim() !== "" && 
                SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY" && SUPABASE_ANON_KEY.trim() !== "") {
                isRealSupabase = true;
                document.getElementById('sandbox-banner').classList.add('hidden');
                document.getElementById('connected-banner').classList.remove('hidden');
            } else {
                isRealSupabase = false;
                document.getElementById('sandbox-banner').classList.remove('hidden');
                document.getElementById('connected-banner').classList.add('hidden');
                
                // Set default mock data in localStorage if empty to make it look realistic for beginners
                if (!localStorage.getItem('mini_app_students')) {
                    const defaultMockStudents = [
                        { full_name: "សុខ ម៉ារី", phone_telegram: "012888999", skill_computer_cli: 4, skill_github: 3, skill_vercel: 2, skill_chatgpt: 5, skill_gemini: 4, skill_claude: 3, skill_javascript: 2 },
                        { full_name: "លី ហួរ", phone_telegram: "015443322", skill_computer_cli: 5, skill_github: 5, skill_vercel: 4, skill_chatgpt: 4, skill_gemini: 3, skill_claude: 3, skill_javascript: 4 },
                        { full_name: "គឹម ឡុង", phone_telegram: "099776655", skill_computer_cli: 2, skill_github: 1, skill_vercel: 1, skill_chatgpt: 3, skill_gemini: 2, skill_claude: 2, skill_javascript: 1 },
                        { full_name: "ចាន់ សុភ័ក្រ", phone_telegram: "@sophakchan", skill_computer_cli: 3, skill_github: 2, skill_vercel: 2, skill_chatgpt: 4, skill_gemini: 4, skill_claude: 5, skill_javascript: 3 },
                        { full_name: "ម៉ៅ ដានី", phone_telegram: "010556677", skill_computer_cli: 4, skill_github: 4, skill_vercel: 3, skill_chatgpt: 5, skill_gemini: 5, skill_claude: 4, skill_javascript: 3 }
                    ];
                    localStorage.setItem('mini_app_students', JSON.stringify(defaultMockStudents));
                }
            }

            // Render all ratings stars UI elements
            SKILL_KEYS.forEach(skillKey => {
                renderStars(skillKey, ratings[skillKey]);
            });

            // Initial fetch to show stats & setup dashboard
            fetchAndDisplayAnalytics();
        });

        // Dynamic star UI rendering
        function renderStars(skillKey, activeValue) {
            const container = document.getElementById(\`rating-container-\${skillKey}\`);
            if (!container) return;
            
            let html = '';
            // Render 5 stars
            for (let i = 1; i <= 5; i++) {
                const isActive = i <= activeValue;
                const starColor = isActive ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-none';
                
                html += \`
                    <button type="button" onclick="setRating('\${skillKey}', \${i})" class="p-1 hover:scale-115 transition-transform duration-100 focus:outline-none cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 \${starColor} transition-colors" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499c.195-.39.75-.39.945 0l3.05 6.22 6.866.998c.417.06.584.57.282.875l-4.97 4.843 1.173 6.842c.07.412-.363.726-.733.53l-6.136-3.23-6.136 3.23c-.37.196-.803-.118-.733-.53l1.173-6.842-4.97-4.843c-.302-.305-.136-.814.282-.875l6.866-.998 3.05-6.22z" />
                        </svg>
                    </button>
                \`;
            }
            
            // Text indicator for rating
            const ratingLabels = {
                1: 'ទាបបំផុត',
                2: 'មធ្យមទាប',
                3: 'បង្គួរ',
                4: 'ខ្លាំង',
                5: 'ស្ទាត់ជំនាញ'
            };
            
            html += \`
                <span class="text-xs font-bold px-2 py-1 bg-slate-100 rounded-lg text-slate-600 min-w-[70px] text-center ml-2">
                    \${activeValue} / 5 (\${ratingLabels[activeValue]})
                </span>
            \`;
            
            container.innerHTML = html;
        }

        // Handle star click to update selected rating
        function setRating(skillKey, rating) {
            ratings[skillKey] = rating;
            renderStars(skillKey, rating);
        }

        // Tab Switching Logic
        function switchTab(tabName) {
            const regBtn = document.getElementById('tab-register-btn');
            const dashBtn = document.getElementById('tab-dashboard-btn');
            const regView = document.getElementById('tab-register-view');
            const dashView = document.getElementById('tab-dashboard-view');

            if (tabName === 'register') {
                regBtn.className = "px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 bg-white text-indigo-600 shadow-sm";
                dashBtn.className = "px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 text-slate-600 hover:text-slate-900";
                regView.style.display = 'block';
                dashView.style.display = 'none';
            } else {
                dashBtn.className = "px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 bg-white text-indigo-600 shadow-sm";
                regBtn.className = "px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 text-slate-600 hover:text-slate-900";
                regView.style.display = 'none';
                dashView.style.display = 'block';
                // Trigger chart update on view
                fetchAndDisplayAnalytics();
            }
        }

        // Form Submission Handler
        async function handleFormSubmit(event) {
            event.preventDefault();

            const submitBtn = document.getElementById('submit-btn');
            const originalBtnHtml = submitBtn.innerHTML;
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = \`
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>កំពុងបញ្ជូនទិន្នន័យ...</span>
            \`;

            const studentData = {
                full_name: document.getElementById('fullName').value.trim(),
                phone_telegram: document.getElementById('phoneTelegram').value.trim(),
                skill_computer_cli: ratings.skill_computer_cli,
                skill_github: ratings.skill_github,
                skill_vercel: ratings.skill_vercel,
                skill_chatgpt: ratings.skill_chatgpt,
                skill_gemini: ratings.skill_gemini,
                skill_claude: ratings.skill_claude,
                skill_javascript: ratings.skill_javascript
            };

            try {
                if (isRealSupabase) {
                    // Real Supabase API Fetch Post Call
                    const response = await fetch(\`\${SUPABASE_URL}/rest/v1/students\`, {
                        method: 'POST',
                        headers: {
                            'apikey': SUPABASE_ANON_KEY,
                            'Authorization': \`Bearer \${SUPABASE_ANON_KEY}\`,
                            'Content-Type': 'application/json',
                            'Prefer': 'return=minimal'
                        },
                        body: JSON.stringify(studentData)
                    });

                    if (!response.ok) {
                        const errorMsg = await response.text();
                        throw new Error(errorMsg || 'ការផ្ញើទិន្នន័យទៅ Supabase បរាជ័យ');
                    }
                } else {
                    // Sandbox local storage fallback
                    let localStudents = JSON.parse(localStorage.getItem('mini_app_students') || '[]');
                    localStudents.push(studentData);
                    localStorage.setItem('mini_app_students', JSON.stringify(localStudents));
                    // Simulate network delay for educational feel
                    await new Promise(resolve => setTimeout(resolve, 800));
                }

                // Show elegant alert
                alert('🎉 ចុះឈ្មោះ និងបញ្ជូនការវាយតម្លៃបានជោគជ័យ! សូមអរគុណសម្រាប់ការចូលរួម។');
                
                // Reset Form and State
                document.getElementById('registration-form').reset();
                ratings = {
                    skill_computer_cli: 3,
                    skill_github: 3,
                    skill_vercel: 3,
                    skill_chatgpt: 3,
                    skill_gemini: 3,
                    skill_claude: 3,
                    skill_javascript: 3
                };
                
                // Re-render rating stars to defaults
                SKILL_KEYS.forEach(skillKey => {
                    renderStars(skillKey, ratings[skillKey]);
                });

                // Fetch new data and transition to dashboard to see results
                await fetchAndDisplayAnalytics();
                switchTab('dashboard');

            } catch (error) {
                console.error("Submission Error:", error);
                alert('❌ មានបញ្ហាក្នុងការផ្ញើទិន្នន័យ៖ ' + error.message);
            } finally {
                // Restore submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        }

        // Fetch Data & Display Analytics Charts
        async function fetchAndDisplayAnalytics() {
            let students = [];
            
            try {
                if (isRealSupabase) {
                    // Real Supabase Fetch Get Call
                    const response = await fetch(\`\${SUPABASE_URL}/rest/v1/students?select=*\`, {
                        method: 'GET',
                        headers: {
                            'apikey': SUPABASE_ANON_KEY,
                            'Authorization': \`Bearer \${SUPABASE_ANON_KEY}\`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('មិនអាចទាញយកទិន្នន័យពី Supabase បានទេ');
                    }
                    students = await response.json();
                } else {
                    // Sandbox local storage fallback
                    students = JSON.parse(localStorage.getItem('mini_app_students') || '[]');
                }

                // Update quick stats badges
                document.getElementById('student-count-badge').textContent = students.length;

                if (students.length === 0) {
                    document.getElementById('chart-empty-state').classList.remove('hidden');
                    document.getElementById('chart-card').classList.add('hidden');
                    return;
                }

                document.getElementById('chart-empty-state').classList.add('hidden');
                document.getElementById('chart-card').classList.remove('hidden');

                // Calculate averages for each skill
                const averages = {};
                SKILL_KEYS.forEach(skillKey => {
                    const totalSum = students.reduce((sum, s) => sum + (Number(s[skillKey]) || 0), 0);
                    averages[skillKey] = students.length > 0 ? (totalSum / students.length).toFixed(2) : 0;
                });

                // Prepare Chart Data
                const labels = SKILL_KEYS.map(key => SKILL_LABELS[key]);
                const dataValues = SKILL_KEYS.map(key => averages[key]);

                // Destroy existing chart to prevent canvas overlap
                if (chartInstance) {
                    chartInstance.destroy();
                }

                // Render Chart.js
                const ctx = document.getElementById('skillsChart').getContext('2d');
                chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'កម្រិតយល់ដឹងមធ្យមភាគរបស់សិស្ស',
                            data: dataValues,
                            backgroundColor: [
                                'rgba(99, 102, 241, 0.85)',  // Indigo
                                'rgba(14, 165, 233, 0.85)',   // Sky
                                'rgba(16, 185, 129, 0.85)',  // Emerald
                                'rgba(245, 158, 11, 0.85)',  // Amber
                                'rgba(239, 68, 68, 0.85)',   // Rose
                                'rgba(139, 92, 246, 0.85)',  // Violet
                                'rgba(236, 72, 153, 0.85)'   // Pink
                            ],
                            borderColor: [
                                'rgb(99, 102, 241)',
                                'rgb(14, 165, 233)',
                                'rgb(16, 185, 129)',
                                'rgb(245, 158, 11)',
                                'rgb(239, 68, 68)',
                                'rgb(139, 92, 246)',
                                'rgb(236, 72, 153)'
                            ],
                            borderWidth: 1.5,
                            borderRadius: 12,
                            borderSkipped: false,
                            barThickness: window.innerWidth < 640 ? 18 : 34
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false // Disable legend since we have unique colors
                            },
                            tooltip: {
                                padding: 12,
                                bodyFont: {
                                    family: 'Kantumruy Pro, sans-serif',
                                    size: 13
                                },
                                titleFont: {
                                    family: 'Kantumruy Pro, sans-serif',
                                    size: 13,
                                    weight: 'bold'
                                },
                                callbacks: {
                                    label: function(context) {
                                        return \` ពិន្ទុមធ្យម៖ \${context.raw} / ៥.០០\`;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                min: 0,
                                max: 5,
                                ticks: {
                                    stepSize: 1,
                                    font: {
                                        family: 'Kantumruy Pro, Inter',
                                        size: 11
                                    },
                                    callback: function(value) {
                                        return value + '.0';
                                    }
                                },
                                grid: {
                                    color: '#f1f5f9'
                                }
                            },
                            x: {
                                ticks: {
                                    font: {
                                        family: 'Kantumruy Pro',
                                        size: 11,
                                        weight: '600'
                                    }
                                },
                                grid: {
                                    display: false
                                }
                            }
                        },
                        animation: {
                            duration: 1200,
                            easing: 'easeOutQuart'
                        }
                    }
                });

            } catch (error) {
                console.error("Fetch Error:", error);
                // Fail silently but show alert if forced refresh
                alert('❌ មិនអាចទាញយកទិន្នន័យដើម្បីបង្ហាញក្រាហ្វិកបានទេ៖ ' + error.message);
            }
        }
    </script>
</body>
</html>`;
