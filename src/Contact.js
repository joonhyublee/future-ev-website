import React from 'react';
import AspectRatio from './AspectRatio';

export default () => [
    <AspectRatio
        className="image-small"
        aspectRatio="4:3"
    >
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3212.4679577856646!2d127.35955231526124!3d36.373664099292505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35654bca0cbd98a1%3A0xf05e5d74520f5a0b!2sSketchLab!5e0!3m2!1sko!2skr!4v1526548732162"/>
    </AspectRatio>,

    <div className="image-small-content">
        #410 Department of Industrial Design (N25), KAIST<br/>
        291 Daehak-ro, Yuseong-gu, Daejeon, 34141<br/>
        Republic of Korea<br/>
        +82-42-350-4564<br/>
        <p/>

        34141 대전광역시 유성구 대학로 291<br/>
        KAIST 산업디자인학과동(N25) 410호<br/>
        042-350-4564 (내선번호 4564)<br/>
        <p/>
    </div>
];