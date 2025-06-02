// src/components/settings/ApparenceSettings.jsx
import React, { useState, useEffect } from 'react';
import { Sun, Moon, MonitorSmartphone, Palette, CheckCircle, Edit2, Tag } from 'lucide-react'; // Adicionado Tag

// Lista de tipos de tags que podem ter suas cores personalizadas
// Idealmente, isso poderia vir de uma constante global ou ser mais dinâmico no futuro
const DEFAULT_TAG_TYPES = [
  { key: 'aula', name: 'Aula' },
  { key: 'prova', name: 'Prova' },
  { key: 'reuniao', name: 'Reunião' },
  { key: 'evento', name: 'Evento' },
  { key: 'trabalho', name: 'Trabalho' },
  { key: 'lembrete', name: 'Lembrete' },
  { key: 'pessoal', name: 'Pessoal' },
];

const ApparenceSettings = ({
  currentMode,
  currentDateFormat,
  currentTagColors, // Espera um objeto como { aula: '#rrggbb', prova: 'bg-red-500', ... }
  onModeChange,
  onDateFormatChange,
  onTagColorChange // Espera uma função (tagKey, newColor) => void
}) => {
  // Estado local para edição de cores, para não atualizar o pai em cada keystroke
  const [editableTagColors, setEditableTagColors] = useState(currentTagColors || {});
  const [editingTag, setEditingTag] = useState(null); // Qual tag está sendo editada

  useEffect(() => {
    // Sincroniza o estado editável se as props mudarem (ex: ao carregar dados)
    setEditableTagColors(currentTagColors || {});
  }, [currentTagColors]);


  const handleLocalColorInputChange = (tagKey, colorValue) => {
    setEditableTagColors(prevColors => ({
      ...prevColors,
      [tagKey]: colorValue,
    }));
  };

  const triggerSaveTagColor = (tagKey) => {
    const newColor = editableTagColors[tagKey];
    if (newColor && newColor.trim() !== "" && onTagColorChange) {
      onTagColorChange(tagKey, newColor.trim());
    }
    setEditingTag(null); // Finaliza edição
  };

  const themeOptions = [
    { value: 'claro', label: 'Claro', icon: Sun },
    { value: 'escuro', label: 'Escuro', icon: Moon },
    { value: 'sistema', label: 'Sistema', icon: MonitorSmartphone },
  ];

  const dateFormats = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];

  return (
    <div className="space-y-6">
      {/* Configurações de Tema */}
      <div>
        <h4 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-3">Modo de Exibição</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {themeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => onModeChange && onModeChange(option.value)}
              className={`
                p-3 rounded-lg border-2 transition-all duration-200 ease-in-out
                flex flex-col items-center justify-center space-y-1.5
                ${currentMode === option.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-700/30 ring-1 ring-blue-500'
                  : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 bg-white dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-600'
                }
              `}
            >
              <option.icon size={22} className={`${currentMode === option.value ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`} />
              <span className={`font-medium text-sm ${currentMode === option.value ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
        {currentMode === 'sistema' && (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                O tema seguirá a preferência do seu sistema operacional.
            </p>
        )}
      </div>

      {/* Configurações de Formato de Data */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <label htmlFor="dateFormatSelect" className="block text-md font-semibold text-slate-700 dark:text-slate-200 mb-2">Formato de Data Preferido</label>
        <select
          id="dateFormatSelect"
          value={currentDateFormat}
          onChange={(e) => onDateFormatChange && onDateFormatChange(e.target.value)}
          className="w-full max-w-xs p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 dark:text-slate-200 text-sm"
        >
          {dateFormats.map(format => <option key={format} value={format}>{format}</option>)}
        </select>
      </div>

      {/* Configurações de Cores das Tags */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <h4 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center"><Tag size={18} className="mr-2 text-blue-600 dark:text-blue-400"/> Cores das Tags de Evento</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Personalize as cores para cada tipo de evento no seu calendário. Use códigos hexadecimais (ex: #3b82f6) ou classes de cor de fundo do Tailwind (ex: bg-blue-500).
        </p>
        <div className="space-y-3">
          {DEFAULT_TAG_TYPES.map(tag => (
            <div key={tag.key} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span
                    className={`w-5 h-5 rounded-md mr-3 border border-slate-400 dark:border-slate-500 flex-shrink-0 ${editableTagColors[tag.key]?.startsWith('bg-') ? editableTagColors[tag.key] : ''}`}
                    style={{ backgroundColor: editableTagColors[tag.key]?.startsWith('#') ? editableTagColors[tag.key] : undefined }}
                  ></span>
                  <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">{tag.name}</span>
                </div>
                {editingTag === tag.key ? (
                    <button
                        onClick={() => triggerSaveTagColor(tag.key)}
                        className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-700/30 rounded-full"
                        title="Salvar cor"
                    >
                        <CheckCircle size={20} />
                    </button>
                ) : (
                    <button
                        onClick={() => setEditingTag(tag.key)}
                        className="p-1 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full"
                        title="Editar cor"
                    >
                        <Edit2 size={18} />
                    </button>
                )}
              </div>
              {editingTag === tag.key && (
                <div className="mt-2.5">
                  <input
                    type="text"
                    value={editableTagColors[tag.key] || ''}
                    onChange={(e) => handleLocalColorInputChange(tag.key, e.target.value)}
                    // onBlur={() => triggerSaveTagColor(tag.key)} // Pode ser confuso se o usuário clicar para salvar
                    className="w-full p-2 border border-slate-300 dark:border-slate-500 rounded-md bg-white dark:bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApparenceSettings;