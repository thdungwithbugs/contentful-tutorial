export const contentfulQuery = `query{
    instaCardCodingTest(id:"7xDztcFkia7tlO3CYqd3vj"){
      heroTitle{
        json
      }
      heroDesc
      heroBtnLink
      heroImg{
        title
        url
      }
      introBlockTitle{
        json
      }
      introBlockDownUrl
      introBlockSideImg{
        url
        title
      }
      cardInfoTitle
      cardInfoDesc
      cardInfoIcon{
        title
        url
      }
    }
  }`;

export const graphQlContentfulUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`;
