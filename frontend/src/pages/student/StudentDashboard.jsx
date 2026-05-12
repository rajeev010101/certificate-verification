import StudentSidebar
from "../../components/sidebar/StudentSidebar";

export default function StudentDashboard() {

  const certificates = [
    {
      id: "CERT123",
      course:
        "Full Stack Development",
      issued:
        "10 Jan 2026",
    },

    {
      id: "CERT456",
      course:
        "React Advanced",
      issued:
        "15 Jan 2026",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">

      <StudentSidebar />

      <div className="flex-1 p-8">

        <h1 className="text-5xl font-black mb-10">
          Student Dashboard
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-gray-400">
              Certificates
            </h2>

            <p className="text-5xl font-black mt-3">
              2
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-gray-400">
              Downloads
            </h2>

            <p className="text-5xl font-black mt-3">
              5
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-gray-400">
              Verifications
            </h2>

            <p className="text-5xl font-black mt-3">
              3
            </p>

          </div>

        </div>

        {/* CERTIFICATES */}
        <div>

          <h2 className="text-3xl font-bold mb-6">
            My Certificates
          </h2>

          <div className="grid grid-cols-2 gap-6">

            {certificates.map(
              (cert) => (

                <div
                  key={cert.id}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6"
                >

                  <h3 className="text-2xl font-bold">
                    {cert.course}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    ID:
                    {cert.id}
                  </p>

                  <p className="text-gray-400">
                    Issued:
                    {cert.issued}
                  </p>

                  <button className="mt-5 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500">

                    Download

                  </button>

                </div>
              )
            )}

          </div>

        </div>

      </div>
    </div>
  );
}