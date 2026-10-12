import { Link, useLocation } from "react-router-dom";
import {
  FaBell,
  FaHome,
  FaRobot,
  FaBars,
  FaTimes,
  FaTools,
} from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import {
  getNotifications,
  markNotificationRead,
} from "../../services/notificationService";

export default function Navbar() {
  const { token, role, logout } = useAuth();

  const location = useLocation();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [lastNotificationId, setLastNotificationId] = useState(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  useEffect(() => {
    if (!token) return;

    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    if ("Notification" in window && token) {
      Notification.requestPermission();
    }
  }, [token]);

  useEffect(() => {
    setMobileMenu(false);
    setShowNotifications(false);
  }, [location.pathname]);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();

      setNotifications(data);

      if (data.length > 0) {
        if (lastNotificationId === null) {
          setLastNotificationId(data[0].id);
        } else if (lastNotificationId !== data[0].id) {
          setLastNotificationId(data[0].id);

          showBrowserNotification(
            data[0].title,
            data[0].message
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showBrowserNotification = (title, message) => {
    if (
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      new Notification(title, {
        body: message,
        icon: "/vite.svg",
      });
    }

    const audio = new Audio("/sounds/notification.wav");

    audio.play().catch(() => {});
  };

  const handleNotificationClick = async (id) => {
    try {
      await markNotificationRead(id);
      loadNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navClass = (path) =>
    `flex items-center gap-2 text-sm font-medium transition ${
      isActive(path)
        ? "text-blue-600"
        : "text-slate-600 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-[100] border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
            <FaTools />
          </div>

          <div>
            <div className="text-xl font-extrabold tracking-tight text-slate-900">
              Home<span className="text-blue-600">AI</span>
            </div>

            <div className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:block">
              Smart Home Services
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-7 lg:flex">

          <Link
            to="/"
            className={navClass("/")}
          >
            <FaHome className="text-sm" />
            Home
          </Link>

          <Link
            to="/services"
            className={navClass("/services")}
          >
            <MdMiscellaneousServices className="text-base" />
            Services
          </Link>

          <Link
            to="/assistant"
            className={navClass("/assistant")}
          >
            <FaRobot className="text-sm" />
            AI Assistant
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">
              AI
            </span>
          </Link>

          {token && (
            <Link
              to="/my-bookings"
              className={navClass("/my-bookings")}
            >
              My Bookings
            </Link>
          )}

          {token && role === "provider" && (
            <Link
              to="/provider-dashboard"
              className={navClass("/provider-dashboard")}
            >
              Provider
            </Link>
          )}

          {token && role === "admin" && (
            <Link
              to="/admin"
              className={navClass("/admin")}
            >
              Admin
            </Link>
          )}

        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          {/* Notification */}

          {token && (
            <div className="relative">

              <button
                onClick={() =>
                  setShowNotifications(!showNotifications)
                }
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <FaBell />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification dropdown */}

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Notifications
                      </h3>

                      <p className="text-xs text-slate-400">
                        Stay updated with your bookings
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                      {unreadCount} unread
                    </span>
                  </div>

                  <div className="max-h-96 overflow-y-auto">

                    {notifications.length === 0 ? (
                      <div className="px-5 py-10 text-center">
                        <FaBell className="mx-auto mb-3 text-2xl text-slate-300" />

                        <p className="font-medium text-slate-600">
                          No notifications
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          You're all caught up.
                        </p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() =>
                            handleNotificationClick(
                              notification.id
                            )
                          }
                          className={`cursor-pointer border-b border-slate-100 px-5 py-4 transition hover:bg-slate-50 ${
                            notification.is_read
                              ? "bg-white"
                              : "bg-blue-50/60"
                          }`}
                        >
                          <div className="flex gap-3">

                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                              <FaBell className="text-xs" />
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-slate-800">
                                {notification.title}
                              </h4>

                              <p className="mt-1 text-xs leading-5 text-slate-500">
                                {notification.message}
                              </p>
                            </div>

                          </div>
                        </div>
                      ))
                    )}

                  </div>
                </div>
              )}

            </div>
          )}

          {/* Desktop Auth */}

          <div className="hidden items-center gap-2 sm:flex">

            {!token ? (
              <>
                <Link
                  to="/login"
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
              >
                Logout
              </button>
            )}

          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}

      {mobileMenu && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 shadow-xl lg:hidden">

          <nav className="flex flex-col gap-2">

            <Link
              to="/"
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              🏠 Home
            </Link>

            <Link
              to="/services"
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              🛠️ Services
            </Link>

            <Link
              to="/assistant"
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              🤖 AI Assistant
            </Link>

            {token && (
              <Link
                to="/my-bookings"
                className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                📋 My Bookings
              </Link>
            )}

            {token && role === "provider" && (
              <Link
                to="/provider-dashboard"
                className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                👨‍🔧 Provider Dashboard
              </Link>
            )}

            {token && role === "admin" && (
              <Link
                to="/admin"
                className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                ⚙️ Admin Dashboard
              </Link>
            )}

            <div className="mt-2 border-t border-slate-100 pt-3">

              {!token ? (
                <div className="grid grid-cols-2 gap-3">

                  <Link
                    to="/login"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-center font-semibold text-slate-700"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="rounded-xl bg-blue-600 px-4 py-3 text-center font-bold text-white"
                  >
                    Get Started
                  </Link>

                </div>
              ) : (
                <button
                  onClick={logout}
                  className="w-full rounded-xl bg-slate-900 px-4 py-3 font-bold text-white"
                >
                  Logout
                </button>
              )}

            </div>

          </nav>
        </div>
      )}
    </header>
  );
}