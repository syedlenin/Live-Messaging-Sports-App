import React, { useState, useEffect } from 'react';
import Message from './Message'; // Import the Message component

function App() {
  const [messageText, setMessageText] = useState('');
  const [currentTime, setCurrentTime] = useState(67);

  // Simulate live time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prev => prev < 90 ? prev + 1 : prev);
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const activeMatches = [
    { id: 1, teams: 'Arsenal vs Chelsea', score: '2 - 1', minute: 67, status: 'LIVE', league: 'EPL' },
    { id: 2, teams: 'Real Madrid vs Barcelona', score: '0 - 0', minute: 62, status: 'LIVE', league: 'UCL' },
    { id: 3, teams: 'Man City vs Liverpool', score: '1 - 2', minute: 84, status: 'LIVE', league: 'EPL' },
    { id: 4, teams: 'Atletico vs Valencia', score: '- vs -', minute: 0, status: 'Upcoming', league: 'LA LIGA' }
  ];

  const recentMessages = [
    { id: 1, type: 'GOAL', player: 'Bukayo Saka', team: 'Arsenal', score: '2 - 1 Chelsea', minute: 67, time: '2 min ago' },
    { id: 2, type: 'GOAL', player: 'Gabriel Jesus', team: 'Arsenal', score: '1 - 1 Chelsea', minute: 34, time: '2 min ago' },
    { id: 3, type: 'YELLOW', player: 'Enzo Fernandez', team: 'tackle', minute: 28, time: '5 min ago' },
    { id: 4, type: 'GOAL', player: 'Cole Palmer', team: 'Chelsea', score: '0 - 1 Chelsea', minute: 15, time: '12 min ago' },
    { id: 5, type: 'KICKOFF', text: 'Arsenal vs Chelsea is underway!', time: '18 min ago' }
  ];

  const getMessageIcon = (type) => {
    switch(type) {
      case 'GOAL': return '⚽';
      case 'YELLOW': return '🟨';
      case 'RED': return '🟥';
      case 'KICKOFF': return '⚽';
      default: return '📝';
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex', fontFamily: 'Arial, sans-serif' }}>
      {/* Left Sidebar - Active Matches */}
      <div style={{ width: '280px', backgroundColor: 'white', borderRight: '1px solid #e0e0e0', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{
            width: '40px', height: '40px', backgroundColor: '#007bff', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '20px', marginRight: '12px'
          }}>⚽</div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff', margin: 0 }}>DNS Live Football</h2>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{
            padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold',
            marginRight: '8px', backgroundColor: '#28a745', color: 'white'
          }}>Live</span>
          <span style={{
            padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold',
            marginRight: '8px', backgroundColor: '#ffc107', color: 'black'
          }}>3 Active</span>
        
        </div>

        <h3 style={{
          fontSize: '12px', textTransform: 'uppercase', color: '#666',
          marginBottom: '12px', fontWeight: 'bold'
        }}>ACTIVE MATCHES</h3>
        
        {activeMatches.map(match => (
          <div key={match.id} style={{
            backgroundColor: 'white', border: match.status === 'LIVE' ? '1px solid #dc3545' : '1px solid #e0e0e0',
            borderRadius: '8px', marginBottom: '8px', padding: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{
                backgroundColor: '#007bff', color: 'white', padding: '2px 6px',
                borderRadius: '3px', fontSize: '10px'
              }}>{match.league}</span>
              <span style={{
                padding: '2px 6px', borderRadius: '3px', fontSize: '10px', fontWeight: 'bold',
                backgroundColor: match.status === 'LIVE' ? '#dc3545' : '#6c757d', color: 'white'
              }}>{match.status}</span>
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>{match.teams}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{match.score}</span>
              {match.status === 'LIVE' && 
                <span style={{
                  backgroundColor: '#28a745', color: 'white', padding: '2px 6px',
                  borderRadius: '3px', fontSize: '10px'
                }}>{match.minute}'</span>
              }
              {match.status === 'Upcoming' && 
                <span style={{color: '#666', fontSize: '10px'}}>20:00</span>
              }
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '24px' }}>
        {/* Match Header */}
        <div style={{
          backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '24px', padding: '20px'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'
          }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, marginBottom: '8px', color: '#333' }}>
                Arsenal vs Chelsea
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#666' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🏟️ Emirates Stadium</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>👥 22,325 subscribers</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>MINUTE</span>
              <span style={{
                backgroundColor: '#ff6b35', color: 'white', padding: '4px 8px',
                borderRadius: '4px', fontSize: '14px', fontWeight: 'bold'
              }}>{currentTime}</span>
              <span style={{
                backgroundColor: '#ff6b35', color: 'white', padding: '4px 8px',
                borderRadius: '4px', fontSize: '14px', fontWeight: 'bold'
              }}>+ST</span>
            </div>
          </div>
          
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '40px', padding: '20px 0'
          }}>
            {/* Arsenal */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                backgroundColor: '#6c5ce7', color: 'white', width: '48px', height: '48px',
                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', fontWeight: 'bold'
              }}>A</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  fontSize: '14px', color: '#666', textTransform: 'uppercase', marginBottom: '4px'
                }}>ARSENAL</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>2</div>
              </div>
            </div>
            
            {/* VS */}
            <div style={{ fontSize: '18px', color: '#666', fontWeight: 'bold' }}>VS</div>
            
            {/* Chelsea */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                <div style={{
                  fontSize: '14px', color: '#666', textTransform: 'uppercase',
                  marginBottom: '4px', textAlign: 'right'
                }}>CHELSEA</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', textAlign: 'right' }}>1</div>
              </div>
              <div style={{
                backgroundColor: '#6c5ce7', color: 'white', width: '48px', height: '48px',
                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', fontWeight: 'bold'
              }}>C</div>
              <div style={{
                backgroundColor: '#333', color: 'white', padding: '4px 8px',
                borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'
              }}>+</div>
            </div>
          </div>
        </div>

        {/* Message Templates Component */}
        <Message />
      </div>

      {/* Right Sidebar - Messages */}
      <div style={{ width: '320px', backgroundColor: 'white', borderLeft: '1px solid #e0e0e0', padding: '16px' }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
          <h3 style={{margin: 0, fontSize: '18px'}}>Message Composer</h3>
          <button style={{color: '#007bff', fontSize: '12px', border: 'none', background: 'none', cursor: 'pointer'}}>Clear All</button>
        </div>

        <div style={{
          backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px',
          padding: '16px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{marginRight: '8px'}}>⚽</span>
            <strong style={{ fontSize: '12px' }}>GOAL!</strong>
            <span style={{ color: '#666', fontSize: '12px' }}> Bukayo Saka scores for Arsenal!</span>
          </div>
          <p style={{ fontSize: '12px', marginBottom: '8px' }}>Arsenal 2 - 1 Chelsea | 67'</p>
          <div style={{ marginBottom: '12px' }}>
            <span style={{ color: '#666', fontSize: '12px' }}>67/160 characters</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              backgroundColor: '#28a745', color: 'white', border: 'none',
              padding: '8px 16px', borderRadius: '4px', cursor: 'pointer',
              fontSize: '12px', flex: 1
            }}>
              📤 Send Now
            </button>
            <button style={{
              border: '1px solid #ddd', backgroundColor: 'white',
              padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px'
            }}>
              🕒
            </button>
          </div>
        </div>

        <div>
          <h4 style={{ color: '#666', marginBottom: '12px' }}>Recent Messages</h4>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {recentMessages.map(message => (
              <div key={message.id} style={{
                backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '12px', marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ marginRight: '8px', fontSize: '16px' }}>{getMessageIcon(message.type)}</span>
                  <div style={{ flex: 1 }}>
                    {message.type === 'GOAL' && (
                      <div>
                        <strong style={{ fontSize: '12px', color: '#28a745' }}>GOAL!</strong>
                        <span style={{ fontSize: '12px' }}> {message.player} scores for {message.team}!</span>
                        <div style={{ fontSize: '12px', color: '#666' }}>{message.score} | {message.minute}'</div>
                        <div style={{ fontSize: '10px', color: '#999' }}>Sent to 22,325 users</div>
                      </div>
                    )}
                    {message.type === 'YELLOW' && (
                      <div>
                        <strong style={{ fontSize: '12px', color: '#ffc107' }}>YELLOW CARD!</strong>
                        <span style={{ fontSize: '12px' }}> {message.player} booked for {message.team} | {message.minute}'</span>
                        <div style={{ fontSize: '10px', color: '#999' }}>Sent to 22,325 users</div>
                      </div>
                    )}
                    {message.type === 'KICKOFF' && (
                      <div>
                        <strong style={{ fontSize: '12px', color: '#007bff' }}>KICK OFF!</strong>
                        <span style={{ fontSize: '12px' }}> {message.text}</span>
                        <div style={{ fontSize: '10px', color: '#999' }}>Sent to 22,325 users</div>
                      </div>
                    )}
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '10px', color: '#999' }}>{message.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        position: 'fixed', bottom: '20px', right: '20px',
        display: 'flex', flexDirection: 'column', gap: '12px'
      }}>
        
      </div>
    </div>
  );
}

export default App;