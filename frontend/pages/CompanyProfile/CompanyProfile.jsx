import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const mockCompany = {
  name: 'Acme Labs',
  motto: 'Building the future of work',
  about: 'Acme Labs is a product-led company focused on delightful tools for modern teams.',
  values: ['Customer Obsession', 'Bias for Action', 'Craftsmanship', 'Learning'],
  perks: [
    { icon: '☕', label: 'Free coffee' },
    { icon: '❤️', label: 'Health insurance' },
    { icon: '🌴', label: 'Unlimited PTO' },
    { icon: '🏠', label: 'Remote-friendly' },
  ],
  jobs: [
    { id: 1, title: 'Senior React Engineer', location: 'Remote', skills: ['React', 'TypeScript'], fit: 84 },
    { id: 2, title: 'ML Engineer', location: 'Hybrid', skills: ['Python', 'PyTorch'], fit: 73 },
  ],
};

const CompanyProfile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const company = mockCompany; // replace with fetch using params.slug/id

  return (
    <div className="min-h-screen min-w-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gray-100 rounded-xl" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
              <p className="text-gray-600">{company.motto}</p>
            </div>
          </div>
          <button onClick={() => navigate('/jobs')} className="px-4 py-2 rounded-lg bg-gray-100">Back to jobs</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
            <p className="text-gray-700 leading-relaxed">{company.about}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Company values</h2>
            <div className="flex flex-wrap gap-2">
              {company.values.map((v) => (
                <span key={v} className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-sm">{v}</span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Open roles</h2>
            <div className="space-y-3">
              {company.jobs.map((job) => (
                <div key={job.id} className="p-4 border rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-600">{job.location}</div>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {job.skills.map((s) => (
                        <span key={s} className="px-2 py-1 rounded bg-gray-100 text-xs text-gray-700">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full border-4 border-purple-200 flex items-center justify-center">
                      <div className="text-purple-700 text-sm font-semibold">{job.fit}%</div>
                    </div>
                    <button className="px-3 py-2 rounded-lg bg-purple-600 text-white">Apply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Perks & benefits</h3>
            <ul className="space-y-2">
              {company.perks.map((p) => (
                <li key={p.label} className="flex items-center space-x-3">
                  <span className="text-lg">{p.icon}</span>
                  <span className="text-gray-700 text-sm">{p.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-16 bg-gray-100 rounded" />
              <div className="h-16 bg-gray-100 rounded" />
              <div className="h-16 bg-gray-100 rounded" />
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CompanyProfile;

 