import React from 'react'
import { Descriptions } from 'antd'

function MovieInfo(props) {
    let { title, score, genres, actors, opened_at } = props;

    return (
        <Descriptions title="" bordered>
            <Descriptions.Item label="제목 &nbsp;">{title}</Descriptions.Item>
            <Descriptions.Item label="평점 &nbsp;">{score === null ? 0 : score}</Descriptions.Item>
            <Descriptions.Item label="&emsp;&emsp;&emsp;&emsp;장르 &nbsp;" >{genres && genres.map(genre => genre.name).join(", ")}</Descriptions.Item>
            <Descriptions.Item label="출연 &nbsp;">{actors && actors.map(actor => actor.name).join(", ")}</Descriptions.Item>
            <Descriptions.Item label="&nbsp;&nbsp;&nbsp;개봉일 &nbsp;">{opened_at}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo
