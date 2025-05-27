import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileCheck,
  FolderClosed,
  Map,
  ChevronDown,
  ChevronUp,
  Building,
  SlidersHorizontal,
  BookOpenCheck,
} from "lucide-react";
import { cn } from "../../utils/cn";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (name: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    {
      name: "Departments",
      icon: Building,
      submenu: [
        { name: "Main", path: "/departments/main" },
        { name: "Sub Department", path: "/departments/sub" },
      ],
    },
    {
      name: "Documents Types",
      path: "/documents",
      icon: FileText,
    },
    // { name: "Documents", icon: FileText, path: "/my-documents" },
    { name: "Pending Approvals", icon: FileCheck, path: "/pending-approvals" },
    { name: "Recent Activity", icon: Clock, path: "/activity" },
    { name: "Department Files", icon: FolderClosed, path: "/department" },
    { name: "Team", icon: Users, path: "/team" },
    {
      name: "Users Settings",
      icon: Users,
      submenu: [
        { name: "Users", path: "/users/members" },
        { name: "User Access", path: "/users/access" },
      ],
    },
    {
      name: "Digitalization Settings",
      icon: Users,
      submenu: [
        { name: "Allocation", path: "/digitalization/allocation" },
        { name: "Batch Upload", path: "/digitalization/batch-upload" },
      ],
    },

    {
      name: "Locations",
      icon: Map,
      submenu: [
        { name: "Regions", path: "/locations/regions" },
        { name: "Municipalities", path: "/locations/municipalities" },
        { name: "Barangays", path: "/locations/barangays" },
      ],
    },
    {
      name: "OCR",
      icon: BookOpenCheck,
      submenu: [
        { name: "Unrecorded", path: "/ocr/unrecorded" },
        { name: "Template", path: "/ocr/template" },
        { name: "Handwritten", path: "/ocr/handwritten" },
      ],
    },
    {
      name: "LGU Maintenance",
      path: "/lgu",
      icon: SlidersHorizontal,
    },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div
      className={cn(
        "bg-blue-900 text-white flex flex-col transition-all duration-300 ease-in-out relative",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-blue-800">
        {!isCollapsed && (
          <h1 className="text-xl font-semibold text-white">DMS</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-1 rounded-md text-blue-300 hover:text-white hover:bg-blue-800 focus:outline-none",
            isCollapsed ? "mx-auto" : ""
          )}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={cn(
                      "flex items-center w-full px-2 py-2 rounded-md transition-colors text-left",
                      "text-blue-300 hover:text-white hover:bg-blue-800",
                      isCollapsed ? "justify-center" : ""
                    )}
                  >
                    <item.icon
                      className={cn(
                        "flex-shrink-0",
                        isCollapsed ? "h-6 w-6" : "h-5 w-5 mr-3"
                      )}
                    />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.name}</span>
                        {openSubmenus[item.name] ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </>
                    )}
                  </button>
                  {openSubmenus[item.name] && !isCollapsed && (
                    <ul className="ml-8 space-y-1 mt-1">
                      {item.submenu.map((sub) => (
                        <li key={sub.name}>
                          <NavLink
                            to={sub.path}
                            className={({ isActive }) =>
                              cn(
                                "block px-2 py-1 rounded-md text-sm",
                                isActive
                                  ? "bg-blue-800 text-white"
                                  : "text-blue-300 hover:text-white hover:bg-blue-800"
                              )
                            }
                          >
                            {sub.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-2 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-blue-800 text-white"
                        : "text-blue-300 hover:text-white hover:bg-blue-800",
                      isCollapsed ? "justify-center" : ""
                    )
                  }
                >
                  <item.icon
                    className={cn(
                      "flex-shrink-0",
                      isCollapsed ? "h-6 w-6" : "h-5 w-5 mr-3"
                    )}
                  />
                  {!isCollapsed && <span>{item.name}</span>}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-blue-800">
        {!isCollapsed && (
          <div className="text-xs text-blue-300">
            <p>DMS v1.0</p>
            <p>© 2025 Company</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
