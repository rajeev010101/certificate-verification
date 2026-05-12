import {
  LayoutDashboard,
  Users,
  Award,
  Upload,
} from "lucide-react";

export default function ManagerSidebar() {

  const menus = [
    {
      name: "Dashboard",
      icon:
        <LayoutDashboard />,
    },

    {
      name: "Students",
      icon:
        <Users />,
    },

    {
      name: "Certificates",
      icon:
        <Award />,
    },

    {
      name: "Bulk Upload",
      icon:
        <Upload />,
    },
  ];

  return (
    <div className="w-[280px] bg-[#020617] border-r border-white/10 h-screen p-6 text-white">

      <h1 className="text-3xl font-black mb-10">
        MANAGER
      </h1>

      <div className="space-y-3">

        {menus.map(
          (m) => (

            <div
              key={m.name}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 cursor-pointer transition"
            >

              {m.icon}

              <span>
                {m.name}
              </span>

            </div>
          )
        )}

      </div>
    </div>
  );
}