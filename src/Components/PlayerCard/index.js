import React from 'react'
import moment from 'moment';
import './styles.css';

const PlayerCard = (props) => {
  const {player} = props;
  const {Id, PFName, PDName, SkillDesc, Value} = player;
  const match = player.UpComingMatchesList[0];
  let matchInfo = `${match.CCode} vs ${match.VsCCode}`;
  matchInfo = matchInfo.length > 4 ? matchInfo : 'No match scheduled'
  let localTime = moment(new Date(match.MDate + ' UTC')).format(
    'DD-MM-YYYY h:mm:ss a'
    )
  localTime = localTime === 'Invalid date' ? 'NA' : localTime;
  return (
    <div className='card'>
      <div>
        <img
          src={`/player-images/${Id}.jpg`}
          alt={`Player ${PFName} Face`}
        />
      </div>
      <h2>{PDName}</h2>
      <p>
        <span class="field">Upcoming Match</span> - {matchInfo}
      </p>
      <p>
        <span class="field">Timing</span> - {localTime}
      </p>
      <div class="playerinfo">
        <p><span class="field">Skill</span> - {SkillDesc}</p>
        <p><span class="field">Value</span> - ${Value}M</p>
      </div>
    </div>
  )
}

export default PlayerCard;