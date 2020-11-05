module.exports = {
  /**
   * Promise to add record
   *
   * @return {Promise}
   */



  async create(data, { files } = {}) {
    // data is a json object
    // transfomr to data = { question, answers, surveyId}
    Object.entries(data.json).map(items => {
      const datum = {
        question : items[0],
        answer: items[1],
        surveyId: data.surveyId
      }

      return strapi.query('response').create(datum);
    })
  },


  async findBySurvey(params) {
      const surveyResults = await strapi.query('response').find({surveyId: params});
      const array = surveyResults.map((item) => {
        return {[item.question] : item.answer} // [{email : 'john@doe.com'}, {email : 'doe@john.com'}, etc...]
      })

      /** pushValue description
      * @param {string} answer is the value of the property email : "answer"
      * @param {[]} arrayAnswer is the question name's property like email = []
      * if the value is an array['answer'] we map the array to push item
      * if not we directly push the value into the property
      */
      function pushValue(answer, arrayAnswer) {
        if (Array.isArray(answer)) {
          answer.map((item) => {
            arrayAnswer.push(item);
          })
        } else {
          arrayAnswer.push(answer);
        }
      }

      const answersGroup = {};
      // This loop regroups the question and their answers in answersObject
      for (const obj of array) { // => { email : ['john@doe.com', doe@john.com'], col: ['v','rond','v']}

        for (const question in obj) {
          const answer = obj[question];

            /*  Verify if the Object answers got the property then we create the property = an array
                then we use pushValue method's
                if not we directy => use the method pushValue;
            */
          if (!answersGroup.hasOwnProperty(question)) {
            answersGroup[question] = [];
            pushValue(answer, answersGroup[question]);
          } else {
            pushValue(answer, answersGroup[question]);
          }
        }
      }

      // Count value for each prop of answersGroup
      /* Final result
        {
          question : 'email',
          answers: [
                      {
                        label : 'john@doe.com',
                        count : 1,
                        percent : 100
                      }
          ]
        }
      */
      function find_duplicate_in_anwser(anwserArray){
        const total = anwserArray.length;
        const count = {}
        const result = []

        anwserArray.forEach(item => {
            if (count[item]) {
                count[item] +=1
                return
            }
            count[item] = 1
        })

        for (let prop in count){
            if (count[prop]){

                result.push({
                    label : prop,
                    count : count[prop],
                    percent : (count[prop]/total*100).toFixed(0)
                })
            }
        }
        return result;

      }

      const data = [];
      Object.entries(answersGroup).map((items) => {
        data.push( {
          question: items[0],
          answers : find_duplicate_in_anwser(items[1])
        })
      })
      return data;

  }


}
