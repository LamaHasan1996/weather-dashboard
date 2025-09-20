import React from "react";
import {useState} from "react";

export default function SearchBar({onSearch}) {
    const [q, setQ] = useState("");
    return (
        <div className="flex gap-3">
            <input
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-500/30"
                placeholder='Search city (e.g., "Berlin")'
                value={q}
                onChange={e => setQ(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') onSearch(q.trim());
                }}
            />
            <button
                className="px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold shadow"
                onClick={() => onSearch(q.trim())}
            >
                Search
            </button>
        </div>
    );
}
