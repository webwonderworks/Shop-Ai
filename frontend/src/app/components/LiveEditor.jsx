import { EDITABLE_PROPERTIES } from "../../config/platforms";

export default function LiveEditor({
  area,
  areaConfig,
  platformConfig,
  onUpdate,
}) {
  const areaSlot = platformConfig.slots[area];
  const editableProps = areaSlot?.editable || [];

  const handleColorChange = (property, value) => {
    onUpdate({ [property]: value });
  };

  const handleRangeChange = (property, value) => {
    onUpdate({ [property]: parseInt(value) });
  };

  const handleSelectChange = (property, value) => {
    onUpdate({ [property]: value });
  };

  const handleTextChange = (property, value) => {
    onUpdate({ [property]: value });
  };

  return (
    <div className="ui-card p-4">
      <h3 className="text-sm font-semibold mb-3">{areaSlot?.name}</h3>
      <p className="text-xs text-slate-400 mb-4">{areaSlot?.description}</p>

      <div className="space-y-4">
        {editableProps.map((propName) => {
          const propConfig = EDITABLE_PROPERTIES[propName];
          if (!propConfig) return null;

          const value = areaConfig[propName];

          return (
            <div key={propName}>
              <label className="block text-xs font-medium mb-2">
                {propConfig.icon} {propConfig.label}
              </label>

              {/* Color Input */}
              {propConfig.type === "color" && (
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={value || "#000000"}
                    onChange={(e) => handleColorChange(propName, e.target.value)}
                    className="w-10 h-8 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={value || "#000000"}
                    onChange={(e) => handleColorChange(propName, e.target.value)}
                    className="flex-1 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-xs text-white font-mono"
                  />
                </div>
              )}

              {/* Range Input */}
              {propConfig.type === "range" && (
                <div>
                  <input
                    type="range"
                    min={propConfig.min}
                    max={propConfig.max}
                    value={value || propConfig.min}
                    onChange={(e) => handleRangeChange(propName, e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    {value || propConfig.min}
                    {propName.includes("Radius") ? "px" : ""}
                  </p>
                </div>
              )}

              {/* Select Input */}
              {propConfig.type === "select" && (
                <select
                  value={value || propConfig.options[0]}
                  onChange={(e) => handleSelectChange(propName, e.target.value)}
                  className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-xs text-white"
                >
                  {propConfig.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {/* Text Input */}
              {propConfig.type === "text" && (
                <input
                  type="text"
                  value={value || ""}
                  onChange={(e) => handleTextChange(propName, e.target.value)}
                  className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-xs text-white"
                  placeholder={propConfig.label}
                />
              )}
            </div>
          );
        })}

        {editableProps.length === 0 && (
          <p className="text-xs text-slate-500 italic">
            Keine bearbeitbaren Eigenschaften für diesen Bereich.
          </p>
        )}
      </div>
    </div>
  );
}
