import Link from "next/link";

const links = {
  "Модули": [
    { href: "/rechnik",   label: "Речник"    },
    { href: "/gramatika", label: "Граматика" },
    { href: "/slusham",   label: "Слушане"   },
    { href: "/chetene",   label: "Четене"    },
  ],
  "Акаунт": [
    { href: "/login",    label: "Вход"         },
    { href: "/register", label: "Регистрация"  },
    { href: "/napredak", label: "Моят напредък"},
  ],
  "Правно": [
    { href: "/terms",   label: "Условия"        },
    { href: "/privacy", label: "Поверителност"  },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-16" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-base"
                style={{ background: "var(--coral)", fontFamily: "var(--font-display)" }}
              >
                У
              </div>
              <span
                className="font-semibold text-sm"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                Учи Английски
              </span>
            </Link>
            <p className="text-xs leading-relaxed max-w-[180px]" style={{ color: "var(--muted)" }}>
              Безплатна платформа за учене на английски с български интерфейс.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--ink)" }}
              >
                {group}
              </p>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors"
                      style={{ color: "var(--muted)" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid var(--line)" }}>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} Учи Английски. Всички права запазени.
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Направено с любов за всички, учещи английски
          </p>
        </div>
      </div>
    </footer>
  );
}
