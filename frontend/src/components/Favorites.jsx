import React from "react";

export default function Favorites({items, onPick, onRemove}) {
    return (
        <div className="card p-4 max-h-[14rem] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-3">Favorites</h3>
            {!items?.length ? (
                <div className="text-slate-500">No favorites yet.</div>
            ) : (
                <ul className="flex flex-col gap-2">
                    {items.map((c) => (
                        <li
                            key={c}
                            className="flex items-center justify-between bg-white border border-slate-100 rounded-xl px-3 py-2"
                        >
                            <button
                                className="text-brand-600 font-semibold hover:underline"
                                onClick={() => onPick(c)}
                            >
                                {c}
                            </button>
                            <button
                                className="text-slate-500 hover:text-red-500"
                                onClick={() => onRemove(c)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

