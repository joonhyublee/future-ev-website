## 설치 및 구동
먼저, `Node.js`([링크](https://nodejs.org))를 다운로드하여 설치합니다. 다음, 본 리포지터리를 클론하고, 커맨드 창에서 해당 경로로 이동하고, 아래 커맨드를 차례대로 실행하면, 웹사이트가 로컬 환경에서 구동을 시작합니다.
```
npm install
npm start
```
구동된 로컬 웹사이트는 아래 주소로 접속할 수 있습니다.
```
http://localhost:4564
```
아래 설명을 따라 내용을 업데이트하고, 로컬 환경에서 구동하여 이상 없이 원하는 대로 바뀌었음을 확인하고, 변경 사항을 커밋하면 인터넷 상 웹사이트도 자동으로 업데이트됩니다.

## 이미지 파일 준비
웹사이트에 업로드할 이미지는 적당한 크기로 줄이고 컴프레션을 활용하여 용량을 최대한 낮춥니다. 참고로, Squoosh([링크](https://squoosh.app/))와 같은 경량 온라인 도구를 사용하여 Resize에서 적절한 크기로 줄이고, MozJPEG 알고리즘의 Quality를 90 정도로 설정하여 컴프레션을 진행하면 눈에 띄는 화질 손실 없이 용량을 크게 낮출 수 있습니다. 예시:
* 전:
  * 파일명: 20220218_graduate_exhibition_skeduler_1.jpg
  * 크기: 4725 x 3544
  * 용량: 5,677 KB
* 후:
  * 파일명: 20220218_graduate_exhibition_skeduler_1.jpg
  * 크기: 1440 x 1080
  * 용량: 263 KB

## 내용 업데이트
본 웹사이트를 구동하기 위한 모든 데이터와 이미지는 본 리포지터리 내에 존재하는 리소스를 사용하는 것을 기본원칙으로 합니다. 또한, 각 항목의 웹 주소는 폴더 내 JSON 파일의 경로를 직접적으로 반영합니다.
```
./people/joonhyublee.json
```
예를 들어, 위 JSON 파일에 해당하는 항목은 아래 웹 주소로 접근이 가능합니다.
```
http://sketch.kaist.ac.kr/people/joonhyublee
```
또한 JSON 파일명은 콘텐츠 목록을 정렬하는 데에 쓰이기도 하며 참조를 걸 때에도 쓰이므로 다음의 조건을 만족하도록 합니다.
  * 고유할 것
  * 간결할 것
  * 정렬될 수 있을 것
  * 변경되지 않을 것
```
# People
./people/seokhyungbae.json
./people/joonhyublee.json

# Publications
./publications/2018_chi_projective_windows.json
./publications/2017_uist_projective_windows.json
./publications/2017_aui_collaborative_experience_prototyping.json

# Awards
./awards/20170308_bk21.json
./awards/20170224_urp_michelangeloar.json
```
## JSON 템플릿
새로운 JSON 파일을 추가할 때엔 아래 템플릿을 활용합니다. 모든 문서는 대표 이미지(`"image"`), 제목(`"title"`), 이를 수식하는 상부 제목(`"supertitle"`) 및 하부 제목(`"subtitle"`), 내용(`"content"`), 그리고 참조(`"reference"`)로 이뤄지며, 각 항목이 어떤 정보를 담아야 하는지는 기존 People, Publications, Awards 문서를 참고하여 통일합니다.
  * ⚠️JSON 파일의 문법이 틀릴 경우(`"` 또는 `,` 누락 등) 서버가 구동하지 않습니다!⚠️
  * 논문 항목은 `"citation"` 항목이 추가되어야 합니다(기존 JSON 파일 참고).
  * 논문 항목의 `"content"` 안의 첫 번째 아이템은 PDF 링크여야 합니다(기존 JSON 파일 참고).
```
{
    "image": "/images/awards/2for3.jpg",
    "supertitle": [
        "🏆 2014 URP Summer/Fall (Achievement Award)"
    ],
    "title": "2for3",
    "subtitle": [
        "Sang-Gyun An"
    ],
    "content": [
        "Toward Remixing Unused Clothing for a Broad Audience",
        "Many people fill their wardrobes with clothing, yet still complain they seem to have nothing to wear. One possible explanation for this phenomenon is that a small number of giant fashion retailers are predominant in the fashion industry."
    ],
    "reference": [
        "/people/sanggyunan"
    ]
}
```
## 포맷팅
웹사이트는 자체적으로 간단한 포맷팅을 지원하며, 기능목록은 다음과 같습니다.
  * 리스트의 경우, 그 안에 있는 항목은 모두 같은 종류여야 합니다.
#### 텍스트 리스트
`"content"`에 단락 대신 줄 바꿈으로 나뉘는 텍스트 리스트를 넣습니다(학력, 이력 등 작성에 유용).
```
"content": [
    "some text in a paragraph",
    [
        "some text with line break",
        "another text with line break",
        "yet another text with line break"
    ],
    "some text in another paragraph",
    "some other text in yet another paragraph"
]
```
#### 링크 및 링크 리스트
`"content"`에 객체를 넣고, `"link"` 항목에 주소를, `"text"` 항목에 링크가 걸릴 텍스트를 적습니다. 리스트 안에 `"link"` 객체가 여러 개 들어갈 경우, 줄 바꿈으로 나뉘는 링크 리스트가 생성됩니다.
```
"content": [
    "some text",
    {
        "link": "/pdf/paper.pdf",
        "text": "[PDF]"
    },
    "some more text",
    [
        {
            "link": "https://news.com/news_article",
            "text": "news coverage of our paper"
        }, {
            "link": "https://news.com/another_news_article",
            "text": "another article about our paper"
        }, {
            "link": "https://news.com/we_are_famous",
            "text": "some more article about our paper"
        }
    ],
    "even more text"
]
```
#### 이미지 및 이미지 테이블
`"content"`에 객체를 넣고, `"image"` 항목에 주소를 적습니다. 리스트 안에 `"image"` 객체가 여러 개 들어갈 경우, 등 너비 이미지 테이블이 생성됩니다.
```
"content": [
    "some text",
    { "image": "/images/url/to/image.jpg" },
    "image caption text",
    [
        { "image": "/images/url/to/first_image_in_table.jpg" },
        { "image": "/images/url/to/second_image_in_table.jpg" },
        { "image": "/images/url/to/third_image_in_table.jpg" }
    ],
    "image table caption text"
]
```
#### 유튜브 동영상
`"content"`에 객체를 넣고, `"youtube"` 항목에 주소를 적습니다. 종횡비는 기본적으로 16:9 비율로 삽입이 되며, `"aspectRatio"` 항목을 이용해 바꿀 수 있습니다. 이때 비율의 표기법은 `"w:h"`(string)을 따릅니다.
  * 주의! 유튜브의 임베드(embed)용 주소를 적을 것!
```
"content": [
    "some text",
    { "youtube": "https://www.youtube.com/embed/tUsqne5GWgk" },
    "video caption text",
    {
        "youtube": "https://www.youtube.com/embed/tUsqne5GWgk",
        "aspectRatio": "4:3"
    },
    "another video caption text"
]
```
#### 스케치팹 3D 모델
유튜브 동영상과 유사한 방식으로 삽입할 수 있습니다. 리스트 안에 `"sketchfab"` 객체가 여러 개 들어갈 경우, 등 너비 테이블이 생성됩니다.
```
"content": [
    "3D model in 16:9 aspect ratio",
    { "sketchfab": "https://sketchfab.com/models/004699ce850e438c967aaa3dba95eea8/embed" },
    "3D model in 4:3 aspect ratio",
    {
        "sketchfab": "https://sketchfab.com/models/004699ce850e438c967aaa3dba95eea8/embed",
        "aspectRatio": "4:3"
    },
    "3D model in table"
    [
        { "sketchfab": "https://sketchfab.com/models/004699ce850e438c967aaa3dba95eea8/embed" },
        { "sketchfab": "https://sketchfab.com/models/004699ce850e438c967aaa3dba95eea8/embed" },
    ]

]
```
#### 인용문 내 글자 기울임
`"citation"`의 문자열 안에 `_`(밑줄)로 구분되는 부분은 기울입니다(학회명 또는 학회지명을 표시할 때 사용됨).
```
"citation": "Hello world _foo bar_ Nice to meet you!"
````
## 디자인 레퍼런스
  * https://www.bloomberg.com
  * https://www.jetbrains.com
  * https://www.soylent.com
  * https://www.technologyreview.com