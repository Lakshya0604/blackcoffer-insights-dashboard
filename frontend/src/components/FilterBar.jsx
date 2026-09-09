import React from 'react';
import Select from 'react-select';

const FIELD_CONFIG = [
  { key: 'end_year', label: 'End Year' },
  { key: 'topic', label: 'Topic' },
  { key: 'sector', label: 'Sector' },
  { key: 'region', label: 'Region' },
  { key: 'pestle', label: 'PEST' },
  { key: 'source', label: 'Source' },
  { key: 'swot', label: 'SWOT' },
  { key: 'country', label: 'Country' },
  { key: 'city', label: 'City' }
];

export default function FilterBar({ options, filters, onChange, onReset }) {
  const handleSelect = (key, selected) => {
    const values = (selected || []).map((s) => s.value);
    onChange({ ...filters, [key]: values });
  };

  return (
    <div className="filter-bar">
      <div className="filter-grid">
        {FIELD_CONFIG.map(({ key, label }) => {
          const opts = (options[key] || []).map((v) => ({ value: v, label: String(v) }));
          // Only show filters that have options
          if (opts.length === 0) return null;
          const value = (filters[key] || []).map((v) => ({ value: v, label: String(v) }));
          return (
            <div key={key} className="filter-item">
              <label>{label}</label>
              <Select
                isMulti
                options={opts}
                value={value}
                onChange={(sel) => handleSelect(key, sel)}
                placeholder={`All ${label}`}
                classNamePrefix="rs"
              />
            </div>
          );
        })}
      </div>
      <button className="reset-btn" onClick={onReset}>
        Reset Filters
      </button>
    </div>
  );
}
