
import { useState } from "react";
import { Link } from "react-router-dom";

const initialNotifications = [
   {
      id: 1,
      type: "order",
      title: "Your order has been shipped",
      message:
         "Order #NN1024 is on its way. Check your order page for delivery updates.",
      date: "10 min ago",
      unread: true,
      icon: "↗",
      link: "/orders",
   },
   {
      id: 2,
      type: "delivery",
      title: "Order delivered successfully",
      message:
         "Your recent order has been delivered. We hope you enjoy your NalamNilam products.",
      date: "Yesterday",
      unread: true,
      icon: "✓",
      link: "/orders",
   },
   {
      id: 3,
      type: "store",
      title: "Discover our pantry collection",
      message:
         "Explore millets, rice, pulses, oils and spices for your everyday kitchen.",
      date: "2 days ago",
      unread: false,
      icon: "♧",
      link: "/shop",
   },
];

const Notifications = () => {
   const [notifications, setNotifications] = useState(initialNotifications);
   const [filter, setFilter] = useState("all");

   const unreadCount = notifications.filter(
      (item) => item.unread
   ).length;

   const visibleNotifications =
      filter === "unread"
         ? notifications.filter((item) => item.unread)
         : notifications;

   const markAsRead = (id) => {
      setNotifications((prev) =>
         prev.map((item) =>
            item.id === id ? { ...item, unread: false } : item
         )
      );
   };

   const markAllAsRead = () => {
      setNotifications((prev) =>
         prev.map((item) => ({ ...item, unread: false }))
      );
   };

   const clearAll = () => {
      setNotifications([]);
   };

   return (
      <section className="mx-auto min-h-[65vh] max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

         {/* Breadcrumb */}
         <nav className="mb-6 flex items-center gap-2 text-xs text-ink/55">
            <Link to="/" className="hover:text-forest">
               Home
            </Link>
            <span>/</span>
            <span className="font-medium text-forest">
               Notifications
            </span>
         </nav>

         {/* Page Header */}
         <div className="rounded-3xl bg-[#fbf8ef] p-5 sm:p-8">
            <p className="text-[10px] font-bold tracking-[0.2em] text-forest">
               THE LATEST FROM NALAMNILAM
            </p>

            <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
               <div>
                  <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
                     Notifications
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-ink/60">
                     Stay updated on your orders and the latest from NalamNilam.
                  </p>
               </div>

               <span className="w-fit rounded-full border border-forest/15 bg-white px-4 py-2 text-xs font-semibold text-forest">
                  {unreadCount} unread
               </span>
            </div>
         </div>

         {/* Filters and Actions */}
         <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-xl border border-forest/10 bg-white p-1">
               <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className={`rounded - lg px - 4 py - 2 text - xs font - semibold transition ${
   filter === "all"
      ? "bg-forest text-white"
      : "text-ink/60 hover:bg-sage"
} `}
               >
                  All
               </button>

               <button
                  type="button"
                  onClick={() => setFilter("unread")}
                  className={`rounded - lg px - 4 py - 2 text - xs font - semibold transition ${
   filter === "unread"
      ? "bg-forest text-white"
      : "text-ink/60 hover:bg-sage"
} `}
               >
                  Unread ({unreadCount})
               </button>
            </div>

            <div className="flex gap-4">
               <button
                  type="button"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="text-xs font-semibold text-forest transition hover:text-leaf disabled:opacity-40"
               >
                  Mark all as read
               </button>

               <button
                  type="button"
                  onClick={clearAll}
                  disabled={notifications.length === 0}
                  className="text-xs font-semibold text-ink/55 transition hover:text-red-700 disabled:opacity-40"
               >
                  Clear all
               </button>
            </div>
         </div>

         {/* Notification List */}
         <div className="mt-4 space-y-3">
            {visibleNotifications.length === 0 ? (
               <div className="rounded-3xl border border-dashed border-forest/20 bg-[#fffdf8] px-5 py-14 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage text-2xl text-forest">
                     ✓
                  </div>

                  <h2 className="mt-4 font-serif text-2xl font-bold text-ink">
                     {notifications.length === 0
                        ? "You're all caught up"
                        : "No unread notifications"}
                  </h2>

                  <p className="mt-2 text-sm text-ink/60">
                     {notifications.length === 0
                        ? "New updates will appear here when available."
                        : "You've read all your current notifications."}
                  </p>

                  {notifications.length > 0 && (
                     <button
                        type="button"
                        onClick={() => setFilter("all")}
                        className="mt-5 rounded-xl bg-forest px-5 py-3 text-xs font-semibold text-white hover:bg-leaf"
                     >
                        View all notifications
                     </button>
                  )}
               </div>
            ) : (
               visibleNotifications.map((item) => (
                  <article
                     key={item.id}
                     className={`rounded - 2xl border p - 4 transition sm: p - 5 ${
   item.unread
      ? "border-forest/15 bg-sage/60"
      : "border-[#eee9dc] bg-[#fffdf8]"
} `}
                  >
                     <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl text-forest shadow-sm">
                           {item.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                           <div className="flex flex-wrap items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                 <h2 className="text-sm font-semibold text-ink">
                                    {item.title}
                                 </h2>

                                 {item.unread && (
                                    <span
                                       className="h-2 w-2 rounded-full bg-forest"
                                       aria-label="Unread"
                                    />
                                 )}
                              </div>

                              <span className="shrink-0 text-[10px] text-ink/45">
                                 {item.date}
                              </span>
                           </div>

                           <p className="mt-1 text-xs leading-6 text-ink/65">
                              {item.message}
                           </p>

                           <div className="mt-3 flex flex-wrap items-center gap-4">
                              <Link
                                 to={item.link}
                                 onClick={() => markAsRead(item.id)}
                                 className="text-xs font-semibold text-forest hover:text-leaf"
                              >
                                 {item.type === "store"
                                    ? "Explore products →"
                                    : "View details →"}
                              </Link>

                              {item.unread && (
                                 <button
                                    type="button"
                                    onClick={() => markAsRead(item.id)}
                                    className="text-xs text-ink/50 hover:text-forest"
                                 >
                                    Mark as read
                                 </button>
                              )}
                           </div>
                        </div>
                     </div>
                  </article>
               ))
            )}
         </div>

         <p className="mt-5 text-xs leading-5 text-ink/45">
            Notifications currently use sample data and reset on refresh.
            Connect these actions to your backend for persistent notifications.
         </p>
      </section>
   );
};

export default Notifications;