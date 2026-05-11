import {
  useEffect,
  useState,
  useCallback,
} from "react";

import api from "../../services/api";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  motion,
} from "framer-motion";

import {
  FileText,
  Award,
  Activity,
  RefreshCcw,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////
  const [templates, setTemplates] =
    useState([]);

  const [certs, setCerts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  //////////////////////////////////////////////////////
  // FETCH DATA
  //////////////////////////////////////////////////////
  const fetchData = useCallback(
    async () => {

      try {

        setError("");
        setLoading(true);

        //////////////////////////////////////////////////////
        // REQUESTS
        //////////////////////////////////////////////////////
        const [
          tRes,
          cRes,
        ] = await Promise.all([

          api.get("/templates"),

          api.get("/certificates"),
        ]);

        //////////////////////////////////////////////////////
        // SAFE TEMPLATE RESPONSE
        //////////////////////////////////////////////////////
        const templateData =
          Array.isArray(
            tRes.data
          )
            ? tRes.data
            : tRes.data.templates ||
              tRes.data.data ||
              [];

        //////////////////////////////////////////////////////
        // SAFE CERTIFICATE RESPONSE
        //////////////////////////////////////////////////////
        const certData =
          Array.isArray(
            cRes.data
          )
            ? cRes.data
            : cRes.data.certificates ||
              cRes.data.data ||
              [];

        //////////////////////////////////////////////////////
        // SAFE ARRAY STATE
        //////////////////////////////////////////////////////
        setTemplates(
          Array.isArray(templateData)
            ? templateData
            : []
        );

        setCerts(
          Array.isArray(certData)
            ? certData
            : []
        );

      } catch (err) {

        console.error(
          "DASHBOARD ERROR:",
          err
        );

        setError(
          "Failed to load dashboard"
        );

        //////////////////////////////////////////////////////
        // PREVENT CRASH
        //////////////////////////////////////////////////////
        setTemplates([]);
        setCerts([]);

      } finally {

        setLoading(false);
      }
    },
    []
  );

  //////////////////////////////////////////////////////
  // LOAD
  //////////////////////////////////////////////////////
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //////////////////////////////////////////////////////
  // TOTAL VERIFICATIONS
  //////////////////////////////////////////////////////
  const totalVerifications =
    Array.isArray(certs)
      ? certs.reduce(
          (acc, cert) =>
            acc +
            (cert?.verificationCount ||
              0),
          0
        )
      : 0;

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <DashboardLayout>

      <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

        {/* BACKGROUND */}
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px]" />

        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="relative z-10 p-8">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-[0_20px_50px_rgba(124,58,237,0.4)]">

                <Sparkles size={30} />

              </div>

              <div>

                <h1 className="text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">

                  Dashboard

                </h1>

                <p className="text-gray-400 mt-2">
                  Certificate analytics & management
                </p>

              </div>

            </div>

            <button
              onClick={fetchData}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >

              <RefreshCcw size={18} />

              Refresh

            </button>

          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-8 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
              {error}
            </div>
          )}

          {/* LOADING */}
          {loading ? (
            <SkeletonGrid />
          ) : (
            <>

              {/* STATS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                <StatCard
                  title="Templates"
                  value={
                    Array.isArray(
                      templates
                    )
                      ? templates.length
                      : 0
                  }
                  icon={<FileText />}
                />

                <StatCard
                  title="Certificates"
                  value={
                    Array.isArray(certs)
                      ? certs.length
                      : 0
                  }
                  icon={<Award />}
                />

                <StatCard
                  title="Verifications"
                  value={
                    totalVerifications
                  }
                  icon={<Activity />}
                />

              </div>

              {/* TEMPLATES */}
              <Section title="Templates">

                {Array.isArray(
                  templates
                ) &&
                templates.length > 0 ? (

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {templates.map(
                      (
                        template,
                        index
                      ) => (

                        <TemplateCard
                          key={
                            template._id ||
                            index
                          }
                          template={
                            template
                          }
                          index={index}
                        />
                      )
                    )}

                  </div>

                ) : (

                  <EmptyState
                    text="No templates found"
                  />
                )}

              </Section>

              {/* CERTIFICATES */}
              <Section title="Certificates">

                {Array.isArray(
                  certs
                ) &&
                certs.length > 0 ? (

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {certs.map(
                      (
                        cert,
                        index
                      ) => (

                        <CertCard
                          key={
                            cert._id ||
                            index
                          }
                          cert={cert}
                        />
                      )
                    )}

                  </div>

                ) : (

                  <EmptyState
                    text="No certificates found"
                  />
                )}

              </Section>

            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

//////////////////////////////////////////////////////
// SECTION
//////////////////////////////////////////////////////
function Section({
  title,
  children,
}) {
  return (
    <div className="mb-14">

      <h2 className="text-2xl font-bold mb-6">
        {title}
      </h2>

      {children}

    </div>
  );
}

//////////////////////////////////////////////////////
// STAT CARD
//////////////////////////////////////////////////////
function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
    >

      <div className="absolute top-[-40px] right-[-40px] w-[140px] h-[140px] rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">

        <div>

          <p className="text-gray-400 text-sm">
            {title}
          </p>

          <h2 className="text-5xl font-black mt-3">
            {value}
          </h2>

        </div>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">

          {icon}

        </div>

      </div>
    </motion.div>
  );
}

//////////////////////////////////////////////////////
// TEMPLATE CARD
//////////////////////////////////////////////////////
function TemplateCard({
  template,
  index,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="group rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
    >

      {/* HEADER */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">

        <div>

          <h3 className="text-xl font-bold">

            {template?.name ||
              `Template ${
                index + 1
              }`}

          </h3>

          <p className="text-gray-400 text-sm mt-1">
            Certificate Template
          </p>

        </div>

        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">

          <FileText size={20} />

        </div>

      </div>

      {/* PREVIEW */}
      <div className="h-[240px] bg-white overflow-hidden">

        {template?.html ? (

          <iframe
            title={
              template?.name
            }
            srcDoc={
              template?.html
            }
            className="w-full h-full scale-[0.25] origin-top-left pointer-events-none"
            style={{
              width: "400%",
              height: "400%",
              border: "none",
            }}
          />

        ) : (

          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Preview
          </div>
        )}

      </div>
    </motion.div>
  );
}

//////////////////////////////////////////////////////
// CERT CARD
//////////////////////////////////////////////////////
function CertCard({
  cert,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
    >

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-xl font-bold">
            {cert?.name ||
              "Unnamed"}
          </h3>

          <p className="text-gray-400 mt-2">
            {cert?.course ||
              "No Course"}
          </p>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">

          <Award size={22} />

        </div>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <span className="text-sm text-gray-400">
          Verifications
        </span>

        <span className="text-purple-400 font-bold">
          {cert?.verificationCount ||
            0}
        </span>

      </div>
    </motion.div>
  );
}

//////////////////////////////////////////////////////
// EMPTY STATE
//////////////////////////////////////////////////////
function EmptyState({
  text,
}) {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-16 text-center text-gray-400">
      {text}
    </div>
  );
}

//////////////////////////////////////////////////////
// LOADING SKELETON
//////////////////////////////////////////////////////
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {[...Array(6)].map(
        (_, i) => (

          <div
            key={i}
            className="h-40 rounded-3xl bg-white/5 animate-pulse"
          />
        )
      )}

    </div>
  );
}