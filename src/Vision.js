import React from 'react';
import AspectRatio from './AspectRatio';

export default () => [
    <div className="image-big">
        <AspectRatio aspectRatio="16:9">
            <iframe
                src="https://www.youtube.com/embed/QWPrS9k8Goo?rel=0&start=0&mute=1&autoplay=1" // TJB News (ASAS)
                allow="autoplay; encrypted-media"
                allowFullScreen
            />
        </AspectRatio>
        <p/>
        퓨처이브이 – 경량상용차 (Light Commercial Vehicle – 총중량 3.5톤 미만 상용차) 세계 시장에 도전합니다.
        <p/>
        경량상용차는 연간 2,000만대 규모의 시장으로 경제활동에 가장 큰 역할을 하는 차량입니다. 그러나, 디젤 등 화석연료를 주로 사용하면서 환경오염 문제를 유발하고 있습니다. 경제활동을 위한 제품으로써 높은 가성비가 요구될 뿐만 아니라, 매우 다양한 사용 조건들을 만족해야 하기 때문에 경량상용차의 전동화는 결코 쉽지 않습니다. 퓨처이브이는 최고의 전기차 기술을 끊임없이 개발하여, 경제활동의 버팀목인 상공인들에게 가장 적합한 전기차를 제공하겠습니다.
    </div>
];
