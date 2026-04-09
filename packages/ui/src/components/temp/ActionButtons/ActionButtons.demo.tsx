import { useState } from 'react';
import { ActionButtons, ActionButton } from '../ActionButtons';

/**
 * Page de démo pour ActionButtons et ActionButton
 */
export function ActionButtonsDemo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPanel, setShowPanel] = useState(true);

  const handleClose = () => {
    console.log('Close clicked');
    setShowPanel(false);
  };

  const handleExpand = () => {
    console.log('Expand clicked');
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    console.log('Collapse clicked');
    setIsExpanded(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>ActionButtons Component</h1>
      <p style={{ color: '#666', marginBottom: '3rem' }}>
        Boutons d'actions avec animations et variantes de couleurs.
      </p>

      {/* Groupe complet */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Groupe complet</h2>
        <div style={{ position: 'relative', padding: '2rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
          <ActionButtons 
            onClose={handleClose}
            onExpand={handleExpand}
            onCollapse={handleCollapse}
            disableExpand={isExpanded}
            disableCollapse={!isExpanded}
          />
          <p>État : {isExpanded ? 'Agrandi' : 'Normal'}</p>
        </div>
      </section>

      {/* Seulement fermer */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Seulement fermer</h2>
        <div style={{ position: 'relative', padding: '2rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
          <ActionButtons onClose={() => alert('Fermé !')} />
          <p>Un seul bouton affiché</p>
        </div>
      </section>

      {/* Boutons individuels */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Boutons individuels</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ActionButton action="close" onClick={() => console.log('Close')} />
            <span style={{ fontSize: '0.875rem' }}>Close</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ActionButton action="expand" onClick={() => console.log('Expand')} />
            <span style={{ fontSize: '0.875rem' }}>Expand</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ActionButton action="collapse" onClick={() => console.log('Collapse')} />
            <span style={{ fontSize: '0.875rem' }}>Collapse</span>
          </div>
        </div>
      </section>

      {/* États désactivés */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>États désactivés</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ActionButton action="close" onClick={() => {}} disabled />
            <span style={{ fontSize: '0.875rem', color: '#999' }}>Disabled</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ActionButton action="expand" onClick={() => {}} disabled />
            <span style={{ fontSize: '0.875rem', color: '#999' }}>Disabled</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ActionButton action="collapse" onClick={() => {}} disabled />
            <span style={{ fontSize: '0.875rem', color: '#999' }}>Disabled</span>
          </div>
        </div>
      </section>

      {/* Exemple pratique */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Exemple pratique</h2>
        {showPanel ? (
          <div style={{ 
            position: 'relative', 
            padding: '2rem', 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            minHeight: isExpanded ? '300px' : '150px',
            transition: 'min-height 0.3s ease',
          }}>
            <ActionButtons 
              onClose={handleClose}
              onExpand={handleExpand}
              onCollapse={handleCollapse}
              disableExpand={isExpanded}
              disableCollapse={!isExpanded}
            />
            <h3>Panel interactif</h3>
            <p>État : {isExpanded ? 'Agrandi ✓' : 'Normal'}</p>
            <p style={{ fontSize: '0.875rem', color: '#666' }}>
              Utilisez les boutons en haut à droite pour interagir
            </p>
          </div>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>
            <p>Panel fermé</p>
            <button 
              onClick={() => setShowPanel(true)}
              style={{ 
                marginTop: '1rem', 
                padding: '0.5rem 1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Réouvrir
            </button>
          </div>
        )}
      </section>
    </div>
  );
}