import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const steps = [
  { key: 'intro', title: 'Get to know you' },
  { key: 'preferences', title: 'Career preferences' },
  { key: 'resume', title: 'Upload resume' },
  { key: 'review', title: 'Review profile' },
];

const selectableTags = [
  'AI', 'Marketing', 'Finance', 'Product', 'Design', 'React', 'Node.js', 'Python', 'Data Science', 'DevOps', 'Mobile', 'Go', 'Java'
];

const EmployeeOnboarding = () => {
  const navigate = useNavigate();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [fullName, setFullName] = useState('');
  const [headshot, setHeadshot] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const goNext = () => {
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  const goBack = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  const togglePreference = (tag) => {
    setPreferences((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const onUploadResume = async (file) => {
    setResumeFile(file);
    setIsAnalyzing(true);
    // Simulate analysis
    await new Promise((r) => setTimeout(r, 1600));
    setIsAnalyzing(false);
    goNext();
  };

  const onComplete = () => {
    // Persist minimal onboarding state; backend wiring can replace this
    const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
    const profile = {
      ...existingUser,
      fullName,
      preferences,
      hasOnboarded: true,
    };
    localStorage.setItem('user', JSON.stringify(profile));
    navigate('/jobs');
  };

  const Progress = () => (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => {
          const isActive = index === activeStepIndex;
          const isDone = index < activeStepIndex;
          return (
            <div key={step.key} className="flex-1 flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold 
                ${isDone ? 'bg-purple-600 text-white' : isActive ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-2 ${isDone ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
              )}
            </div>
          );
        })}
      </div>
      <div className="text-center text-sm text-gray-600">
        {steps[activeStepIndex].title}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome! Let’s personalize your experience</h1>
          <p className="text-gray-600 mt-2">This takes about 2 minutes.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <Progress />

          {activeStepIndex === 0 && (
            <div className="mt-8">
              <div className="text-center mb-6">
                <p className="text-lg text-gray-800">Hey there! What should we call you?</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Priya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional headshot</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setHeadshot(e.target.files?.[0] || null)}
                    />
                    <p className="text-xs text-gray-500 mt-2">PNG or JPG up to 5MB</p>
                    {headshot && (
                      <p className="text-xs text-gray-700 mt-2">Selected: {headshot.name}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={goBack} disabled className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">Back</button>
                <button onClick={goNext} className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">Continue</button>
              </div>
            </div>
          )}

          {activeStepIndex === 1 && (
            <div className="mt-8">
              <p className="text-gray-800 mb-4">Select your domains and skills. Tap to toggle, your top picks first.</p>
              <div className="flex flex-wrap gap-2">
                {selectableTags.map((tag) => {
                  const selected = preferences.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => togglePreference(tag)}
                      className={`px-3 py-1.5 rounded-full border text-sm transition 
                        ${selected ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'}`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={goBack} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Back</button>
                <button onClick={goNext} className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">Continue</button>
              </div>
            </div>
          )}

          {activeStepIndex === 2 && (
            <div className="mt-8">
              <div className="text-center">
                <label className="inline-block">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 cursor-pointer hover:border-purple-400 transition">
                    <p className="text-lg font-medium text-gray-800">Upload your resume</p>
                    <p className="text-sm text-gray-500 mt-1">PDF or DOCX, up to 5MB</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onUploadResume(file);
                      }}
                    />
                  </div>
                </label>
                {resumeFile && (
                  <p className="text-sm text-gray-700 mt-4">Selected: {resumeFile.name}</p>
                )}
                {isAnalyzing && (
                  <div className="mt-6 flex items-center justify-center space-x-2 text-purple-700">
                    <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:150ms]"></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
                    <span className="ml-2">Analyzing your resume with our AI...</span>
                  </div>
                )}
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={goBack} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Back</button>
                <button onClick={goNext} disabled={!resumeFile || isAnalyzing} className={`px-6 py-2 rounded-lg text-white ${!resumeFile || isAnalyzing ? 'bg-gray-300' : 'bg-purple-600 hover:bg-purple-700'}`}>Continue</button>
              </div>
            </div>
          )}

          {activeStepIndex === 3 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Review your profile</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills & domains</label>
                  <div className="flex flex-wrap gap-2">
                    {preferences.length === 0 && (
                      <span className="text-sm text-gray-500">No selections yet</span>
                    )}
                    {preferences.map((p) => (
                      <span key={p} className="px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-sm">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={goBack} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Back</button>
                <button onClick={onComplete} className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">Finish</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeOnboarding;


