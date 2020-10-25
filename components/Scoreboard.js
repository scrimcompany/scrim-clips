import styled from 'styled-components'
import ScoreboardPlayer from './ScoreboardPlayer'

import { Text } from "@chakra-ui/core";

const Styles = styled.div`
table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }

      :first-child {
        border-top: 1px solid black;
      }

      :nth-child(5) {
        border-bottom: 1px solid black;
      }

      :nth-child(n+6) {  
        background-color: #eee;
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      text-align: center;

      :last-child {
        border-right: 0;
      }
    }
}
`

export default function Scoreboard({ players, kills, hs, assists, deaths, scores, mvps, duration, team_scores }) {

    return (
        <Styles>
            <Text fontSize="lg">Score: {team_scores.join(" - ")}</Text>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Player</th>
                        <th scope="col">Kills</th>
                        <th scope="col">Assists</th>
                        <th scope="col">Deaths</th>
                        <th scope="col">MVPs</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead >
                <tbody>
                    {players.map((steamId, index) => {
                        return (
                            <tr key={steamId}>
                                <th scope="row"><ScoreboardPlayer steamId={steamId}></ScoreboardPlayer></th>
                                <td>{kills[index]}</td>
                                <td>{assists[index]}</td>
                                <td>{deaths[index]}</td>
                                <td>{mvps[index]}</td>
                                <td>{scores[index]}</td>
                            </tr>
                        )
                    })}
                </tbody>

                {/* <div>{players}</div>
            <div>{kills}</div>
            <div>{hs}</div>
            <div>{assists}</div>
            <div>{deaths}</div>
            <div>{scores}</div>
            <div>{mvps}</div>
            <div>{team_scores.join(" - ")}</div> */}
            </table>
        </Styles>
    )
}