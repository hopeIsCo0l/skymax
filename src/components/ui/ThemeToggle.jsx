import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = ({ showLabels = false, className = '' }) => {
  const { themePreference, resolvedTheme, setTheme } = useTheme();

  const options = [
    {
      value: 'light',
      label: 'Light',
      icon: Sun,
      title: 'Light theme'
    },
    {
      value: 'system',
      label: 'System',
      icon: Monitor,
      title: `System theme (${resolvedTheme})`
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: Moon,
      title: 'Dark theme'
    }
  ];

  return (
    <div className={`theme-toggle-container glass-panel ${className}`} role="radiogroup" aria-label="Theme selector">
      {options.map(({ value, label, icon: Icon, title }) => {
        const isActive = themePreference === value;
        return (
          <button
            key={value}
            type="button"
            className={`theme-toggle-btn ${isActive ? 'active' : ''}`}
            onClick={() => setTheme(value)}
            title={title}
            aria-checked={isActive}
            role="radio"
          >
            <Icon size={16} className="theme-toggle-icon" />
            {showLabels && <span className="theme-toggle-label">{label}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
