import { useEffect, useState, useCallback } from "react";
import api from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";
import { motion } from "framer-motion";
import { FileText, Award, Activity } from "lucide-react";

export default function Dashboard() {
  const [templates, setTemplates] = useState([]);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //////////////////////////////////////////////////////
  // 🔥 FETCH DATA
  //////////////////////////////////////////////////////
  const fetchData = useCallback(async () => {
    try {
      setError("");
      setLoading(true);

      const tPromise = api.get("/templates").catch(() => ({ data: [] }));
      const cPromise = api.get("/certificates").catch(() => ({ data: [] }));

      const [tRes, cRes] = await Promise.all([tPromise, cPromise]);

      setTemplates(tRes.data || []);
      setCerts(cRes.data || []);

    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //////////////////////////////////////////////////////
  // 🔥 STATS
  //////////////////////////////////////////////////////
  const totalVerifications = certs.reduce(
    (acc, c) => acc + (c?.verificationCount || 0),
    0
  );

  return (
    <DashboardLayout>
      <div className="p-8 bg-[#0b0f19] min-h-screen text-white">

        {/* 🔥 HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Dashboard 🚀
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Overview of your certificates and templates
            </p>
          </div>

          <button
            onClick={fetchData}
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            Refresh
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <SkeletonGrid />
        ) : (
          <>
            {/* 🔥 STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <StatCard title="Templates" value={templates.length} icon={<FileText />} />
              <StatCard title="Certificates" value={certs.length} icon={<Award />} />
              <StatCard title="Verifications" value={totalVerifications} icon={<Activity />} />
            </div>

            {/* 🔥 TEMPLATES */}
            <Section title="Your Templates">
              {templates.length === 0 ? (
                <EmptyState text="No templates created yet" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {templates.map((t, index) => (
                    <TemplateCard key={t._id} template={t} index={index} />
                  ))}
                </div>
              )}
            </Section>

            {/* 🔥 CERTIFICATES */}
            <Section title="Recent Certificates">
              {certs.length === 0 ? (
                <EmptyState text="No certificates issued yet" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {certs.slice(0, 6).map((c) => (
                    <CertCard key={c._id} cert={c} />
                  ))}
                </div>
              )}
            </Section>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

//////////////////////////////////////////////////////
// 🔥 COMPONENTS
//////////////////////////////////////////////////////

function Section({ title, children }) {
  return (
    <div className="mb-12">
      <h2 className="text-lg font-semibold mb-4 text-gray-300">
        {title}
      </h2>
      {children}
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-xl flex items-center justify-between"
    >
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>

      <div className="text-purple-400 opacity-80">
        {icon}
      </div>
    </motion.div>
  );
}

function TemplateCard({ template, index }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition"
    >
      <h3 className="font-semibold mb-2">
        {template.name || `Template ${index + 1}`}
      </h3>

      <div className="bg-white text-black p-2 rounded text-xs h-24 overflow-hidden">
        {template.html ? (
          <div
            dangerouslySetInnerHTML={{
              __html: template.html?.slice(0, 150) || ""
            }}
          />
        ) : (
          "No preview"
        )}
      </div>
    </motion.div>
  );
}

function CertCard({ cert }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition"
    >
      <h3 className="font-semibold">{cert.name}</h3>
      <p className="text-gray-400 text-sm">{cert.course}</p>

      <p className="text-xs mt-2 text-purple-400">
        Verifications: {cert?.verificationCount || 0}
      </p>
    </motion.div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="p-8 text-center text-gray-400 border border-dashed border-white/10 rounded-xl">
      {text}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-32 bg-white/5 animate-pulse rounded-xl" />
      ))}
    </div>
  );
}