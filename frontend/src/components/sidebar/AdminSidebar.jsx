import {
  LayoutDashboard,
  Users,
  FileText,
  Shield,
  BarChart3,
} from "lucide-react";

export default function AdminSidebar() {

  const menus = [
    {
      name: "Dashboard",
      icon:
        <LayoutDashboard />,
    },

    {
      name: "Managers",
      icon:
        <Users />,
    },

    {
      name: "Templates",
      icon:
        <FileText />,
    },

    {
      name: "Analytics",
      icon:
        <BarChart3 />,
    },

    {
      name: "Security",
      icon:
        <Shield />,
    },
  ];

  return (
    <div className="w-[280px] bg-[#020617] border-r border-white/10 h-screen p-6 text-white">

      <h1 className="text-3xl font-black mb-10">
        ADMIN
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