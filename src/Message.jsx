import React, { useState } from 'react';
import axios from 'axios';

const Message = () => {
  const [activeTab, setActiveTab] = useState('Special');
  const [selectedQuickSelect, setSelectedQuickSelect] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [generatedMessage, setGeneratedMessage] = useState('');

  // Template content based on active tab
  const templateContent = {
    'Special': {
      quickSelect: [
        { icon: '🧤', label: 'Great Save' },
        { icon: '🏠', label: 'Near Miss' },
        { icon: '🏥', label: 'Injury' },
        { icon: '🎯', label: 'Milestone' }
      ],
      eventDetails: {
        0: [ // Great Save
          { label: 'Goalkeeper', value: 'David Raya', placeholder: 'Enter goalkeeper name', key: 'goalkeeper' },
          { label: 'Save Type', value: 'Brilliant Save', placeholder: 'Type of save', key: 'save_type' },
          { label: 'Shot Origin', value: 'Close Range', placeholder: 'Where shot came from', key: 'shot_origin' },
          { label: 'Difficulty', value: 'World Class', placeholder: 'Easy/Good/Brilliant/World Class', key: 'difficulty' }
        ],
        1: [ // Near Miss
          { label: 'Player Name', value: 'Bukayo Saka', placeholder: 'Enter player name', key: 'player_name' },
          { label: 'Attempt Type', value: 'Curled Shot', placeholder: 'Header/Shot/Volley', key: 'attempt_type' },
          { label: 'How Close', value: 'Inches Wide', placeholder: 'How close to goal', key: 'how_close' },
          { label: 'Quality', value: 'Should Have Scored', placeholder: 'Describe the chance', key: 'quality' }
        ],
        2: [ // Injury
          { label: 'Player Name', value: 'Gabriel Jesus', placeholder: 'Enter player name', key: 'player_name' },
          { label: 'Injury Type', value: 'Muscle Strain', placeholder: 'Type of injury', key: 'injury_type' },
          { label: 'Severity', value: 'Precautionary', placeholder: 'Minor/Serious/Unknown', key: 'severity' },
          { label: 'Play Status', value: 'Continuing', placeholder: 'Substituted/Continuing', key: 'play_status' }
        ],
        3: [ // Milestone
          { label: 'Player Name', value: 'Martin Odegaard', placeholder: 'Enter player name', key: 'player_name' },
          { label: 'Milestone Type', value: '100th Appearance', placeholder: 'Type of milestone', key: 'milestone_type' },
          { label: 'Achievement', value: 'Captain Century', placeholder: 'Describe achievement', key: 'achievement' },
          { label: 'Significance', value: 'Club Legend', placeholder: 'Why its important', key: 'significance' }
        ]
      }
    },
    'Goals': {
      quickSelect: [
        { icon: '⚽', label: 'Regular Goal' },
        { icon: '🎯', label: 'Penalty' },
        { icon: '🏃', label: 'Counter Attack' },
        { icon: '🔥', label: 'Screamer' }
      ],
      eventDetails: {
        0: [ // Regular Goal
          { label: 'Goal Scorer', value: 'Bukayo Saka', placeholder: 'Enter scorer name', key: 'goal_scorer' },
          { label: 'Assist By', value: 'Martin Odegaard', placeholder: 'Enter assist name', key: 'assist_by' },
          { label: 'Body Part', value: 'Right Foot', placeholder: 'Left/Right/Header', key: 'body_part' },
          { label: 'Minute', value: '67', placeholder: 'Match minute', key: 'minute' }
        ],
        1: [ // Penalty
          { label: 'Penalty Taker', value: 'Bukayo Saka', placeholder: 'Who took penalty', key: 'penalty_taker' },
          { label: 'Foul By', value: 'Thiago Silva', placeholder: 'Who committed foul', key: 'foul_by' },
          { label: 'Penalty Result', value: 'Bottom Corner', placeholder: 'Where ball went', key: 'penalty_result' },
          { label: 'Minute', value: '67', placeholder: 'Match minute', key: 'minute' }
        ],
        2: [ // Counter Attack
          { label: 'Goal Scorer', value: 'Gabriel Martinelli', placeholder: 'Who scored', key: 'goal_scorer' },
          { label: 'Started By', value: 'William Saliba', placeholder: 'Who started counter', key: 'started_by' },
          { label: 'Passes', value: '3 Pass Move', placeholder: 'Number of passes', key: 'passes' },
          { label: 'Speed', value: 'Lightning Fast', placeholder: 'Pace of attack', key: 'speed' }
        ],
        3: [ // Screamer
          { label: 'Goal Scorer', value: 'Martin Odegaard', placeholder: 'Who scored', key: 'goal_scorer' },
          { label: 'Distance', value: '25 yards', placeholder: 'Distance from goal', key: 'distance' },
          { label: 'Technique', value: 'Curled Shot', placeholder: 'Type of shot', key: 'technique' },
          { label: 'Corner', value: 'Top Corner', placeholder: 'Where it went', key: 'corner' }
        ]
      }
    }
  };

  const currentTemplate = templateContent[activeTab] || templateContent['Special'];
  const currentEventDetails = currentTemplate.eventDetails[selectedQuickSelect] || currentTemplate.eventDetails[0];

  // Handle input changes
  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Function to generate message text based on event type
  const generateMessageText = (eventData, eventType, eventSubtype) => {
    switch (eventType) {
      case 'goals':
        switch (eventSubtype) {
          case 'Regular Goal':
            return `⚽ GOAL! ${eventData.goal_scorer || 'Player'} scores${eventData.assist_by ? ` (assist: ${eventData.assist_by})` : ''}! Arsenal 2-1 Chelsea | ${eventData.minute || '67'}'`;
          case 'Penalty':
            return `🎯 PENALTY GOAL! ${eventData.penalty_taker || 'Player'} converts from the spot! Arsenal 2-1 Chelsea | ${eventData.minute || '67'}'`;
          case 'Counter Attack':
            return `🏃 COUNTER ATTACK GOAL! ${eventData.goal_scorer || 'Player'} finishes off a ${eventData.speed || 'fast'} break! Arsenal 2-1 Chelsea | ${eventData.minute || '67'}'`;
          case 'Screamer':
            return `🔥 SCREAMER! ${eventData.goal_scorer || 'Player'} hits a ${eventData.technique || 'shot'} from ${eventData.distance || '25 yards'} into the ${eventData.corner || 'corner'}! Arsenal 2-1 Chelsea | ${eventData.minute || '67'}'`;
          default:
            return `⚽ GOAL! ${eventData.goal_scorer || 'Player'} scores! Arsenal 2-1 Chelsea`;
        }
      case 'special':
        switch (eventSubtype) {
          case 'Great Save':
            return `🧤 ${eventData.difficulty || 'BRILLIANT'} SAVE! ${eventData.goalkeeper || 'Goalkeeper'} makes a ${eventData.save_type || 'great save'} from ${eventData.shot_origin || 'close range'}!`;
          case 'Near Miss':
            return `🏠 SO CLOSE! ${eventData.player_name || 'Player'} with a ${eventData.attempt_type || 'shot'} that goes ${eventData.how_close || 'inches wide'}! ${eventData.quality || 'Great chance'}!`;
          case 'Injury':
            return `🏥 INJURY UPDATE: ${eventData.player_name || 'Player'} has a ${eventData.injury_type || 'knock'} - ${eventData.severity || 'being assessed'}. ${eventData.play_status || 'Continuing'} for now.`;
          case 'Milestone':
            return `🎯 MILESTONE! ${eventData.player_name || 'Player'} reaches ${eventData.milestone_type || 'milestone'} - ${eventData.achievement || 'achievement'}! ${eventData.significance || 'Special moment'}!`;
          default:
            return `🔴 SPECIAL EVENT! Something notable has happened in the match!`;
        }
      default:
        return `📝 ${eventSubtype}: Event recorded successfully!`;
    }
  };

  // Function to send data to PostgreSQL
  const sendToDatabase = async (eventData, messageText) => {
    try {
      setLoading(true);
      
      // Use your working format but include the generated message
      const response = await axios.post('http://192.168.3.35:8002/sport/api/sportListing/', {
        event_type: activeTab.toLowerCase(),
        event_subtype: currentTemplate.quickSelect[selectedQuickSelect].label,
        event_data: eventData,
        text_for_review: messageText, // Add the generated message here
        created_at: new Date().toISOString()
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Data saved:', response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving to database:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMessage = async () => {
    // Collect current form data
    const currentFormData = {};
    currentEventDetails.forEach(field => {
      const inputElement = document.querySelector(`input[data-key="${field.key}"]`);
      if (inputElement) {
        currentFormData[field.key] = inputElement.value;
      }
    });

    console.log('Generating message for:', activeTab, 'with selected item:', selectedQuickSelect);
    console.log('Form data:', currentFormData);

    // Generate the message text
    const messageText = generateMessageText(
      currentFormData, 
      activeTab.toLowerCase(), 
      currentTemplate.quickSelect[selectedQuickSelect].label
    );
    
    setGeneratedMessage(messageText);

    // Save to database (you can modify this condition as needed)
    let saveSuccess = false;
    if (activeTab === 'Goals' || activeTab === 'Special') {
      saveSuccess = await sendToDatabase(currentFormData, messageText);
      if (saveSuccess) {
        alert('Message generated and saved to database successfully!');
      } else {
        alert('Message generated but failed to save to database.');
      }
    } else {
      alert('Message generated successfully!');
    }
  };

  const handleClearForm = () => {
    console.log('Clearing form');
    setFormData({});
    setGeneratedMessage('');
    // Clear all input fields
    currentEventDetails.forEach(field => {
      const inputElement = document.querySelector(`input[data-key="${field.key}"]`);
      if (inputElement) {
        inputElement.value = field.value; // Reset to default value
      }
    });
  };

  // Reset selectedQuickSelect when tab changes
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedQuickSelect(0);
    setFormData({});
    setGeneratedMessage('');
  };

  const handleQuickSelectClick = (index) => {
    setSelectedQuickSelect(index);
    setFormData({});
    setGeneratedMessage('');
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ borderBottom: '1px solid #e0e0e0', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{margin: 0, fontSize: '18px'}}>Message Templates</h3>
          <span style={{color: '#666', fontSize: '14px'}}>124 templates • 6 categories</span>
        </div>
      </div>
      
      <div style={{ padding: '16px' }}>
        {/* Template Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {[
            { name: 'Goals', icon: '⚽' },
            { name: 'Cards', icon: '🟨' },
            { name: 'Substitutions', icon: '🔄' },
            { name: 'VAR', icon: '📹' },
            { name: 'Time Events', icon: '⏰' },
            { name: 'Special', icon: '🔴' },
            { name: 'Other', icon: '📋' }
          ].map(tab => (
            <button 
              key={tab.name}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                border: 'none', borderRadius: '20px', fontSize: '13px', cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: activeTab === tab.name ? '#007bff' : '#f8f9fa',
                color: activeTab === tab.name ? 'white' : '#666'
              }}
              onClick={() => handleTabChange(tab.name)}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Quick Select */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ color: '#333', marginBottom: '8px', fontSize: '16px', fontWeight: '600' }}>
            Quick Select
          </h4>
          <p style={{ color: '#666', fontSize: '13px', marginBottom: '16px' }}>
            Choose event type for instant templates
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {currentTemplate.quickSelect.map((template, index) => (
              <div 
                key={index} 
                style={{
                  borderRadius: '8px', padding: '12px 8px', textAlign: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                  border: selectedQuickSelect === index ? '2px solid #007bff' : '1px solid #e0e0e0',
                  backgroundColor: selectedQuickSelect === index ? '#f0f7ff' : 'white'
                }}
                onClick={() => handleQuickSelectClick(index)}
              >
                <div style={{ fontSize: '25px', marginBottom: '8px' }}>{template.icon}</div>
                <div style={{ fontSize: '12px', fontWeight: '500', color: '#333' }}>{template.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Details */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: '#333' }}>
            Event Details
            {(activeTab === 'Goals' || activeTab === 'Special') && (
              <span style={{ fontSize: '12px', color: '#007bff', fontWeight: 'normal', marginLeft: '8px' }}>
                (Will be saved to database)
              </span>
            )}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {currentEventDetails.map((field, index) => (
              <div key={index}>
                <label style={{
                  display: 'block', fontSize: '13px', fontWeight: '500',
                  color: '#555', marginBottom: '6px'
                }}>{field.label}</label>
                <input 
                  style={{
                    width: '100%', padding: '10px 12px', border: '1px solid #ddd',
                    borderRadius: '6px', fontSize: '13px', backgroundColor: '#f8f9fa',
                    boxSizing: 'border-box'
                  }}
                  type="text" 
                  defaultValue={field.value}
                  placeholder={field.placeholder}
                  data-key={field.key}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Generated Message Preview */}
        {generatedMessage && (
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: '#333' }}>
              Generated Message
            </h4>
            <div style={{
              backgroundColor: '#f0f7ff', border: '1px solid #007bff', borderRadius: '8px',
              padding: '16px', fontSize: '14px', lineHeight: '1.5'
            }}>
              {generatedMessage}
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                {generatedMessage.length}/160 characters
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            style={{
              background: loading ? '#6c757d' : 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
              color: 'white', border: 'none', padding: '12px 32px', borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: '600',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)', transition: 'all 0.2s'
            }}
            onClick={handleGenerateMessage}
            disabled={loading}
          >
            <span>{loading ? '⏳' : '⚡'}</span>
            {loading ? 'Generating...' : 'Generate Message'}
          </button>
          <button 
            style={{
              backgroundColor: 'transparent', color: '#666', border: '1px solid #ddd',
              padding: '12px 24px', borderRadius: '8px', cursor: 'pointer',
              fontSize: '14px', fontWeight: '500', marginLeft: '12px'
            }}
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>

        {/* Message Template Boxes */}
        <div style={{ marginTop: '32px' }}>
          <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: '#333' }}>
            Message Boxes
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{
              border: '1px solid #e0e0e0', borderRadius: '12px', padding: '16px',
              backgroundColor: 'white', position: 'relative'
             }}>
              <div style={{
                position: 'absolute', top: '12px', right: '12px',
                backgroundColor: '#007bff', color: 'white', padding: '2px 8px',
                borderRadius: '12px', fontSize: '11px', fontWeight: 'bold'
              }}>97/160</div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '18px' }}>⚽</span>
                <div>
                  <strong style={{ fontSize: '14px', color: '#333' }}>PENALTY GOAL! [Player] converts from the spot! [Team] [Score] - [Score] [Opposition] | [Minute]'</strong>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#007bff', fontWeight: '600', marginTop: '8px' }}>
                PENALTY GOAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;