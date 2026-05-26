import Link from "next/link";
import { BookOpen } from "lucide-react";

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
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900 text-sm">Учи Английски</span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed max-w-[180px]">
              Безплатна платформа за учене на английски с български интерфейс.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-3">
                {group}
              </p>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Учи Английски. Всички права запазени.
          </p>
          <p className="text-xs text-gray-400">
            Направено с ❤️ за всички, учещи английски
          </p>
        </div>
      </div>
    </footer>
  );
}
