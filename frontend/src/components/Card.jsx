import { motion } from "framer-motion";

export default function Card({
  children,
  title,
  subtitle,
  actions,
  className = ""
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className={`
        bg-gradient-to-br from-white/5 to-white/10
        backdrop-blur-xl
        border border-white/10
        rounded-2xl
        shadow-xl
        p-5
        hover:shadow-2xl
        transition-all
        ${className}
      `}
    >
      {/* HEADER */}
      {(title || actions) && (
        <div className="flex justify-between items-start mb-4">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-white tracking-wide">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}

      {/* BODY */}
      <div className="text-gray-200">{children}</div>
    </motion.div>
  );
}