var messages = [
  {
    from: 'Jon',
    conversationId: 1,
    fromId: 23,
    messages: [
      {
        status: 'received',
        body: 'hi',
        messageID: 1,
        conversationId: 1,
        senderId: 3,
        recepientId: 34,
      },
      {
        status: 'sent',
        body: 'sup',
        messageID: 2,
        conversationId: 1
      }
    ]
  },
  {
    from: 'Caro',
    messages: [
      {
        status: 'received',
        body: 'hi2',
        messageID: 3,
        conversationId: 2
      },
      {
        status: 'sent',
        body: 'sup2',
        messageID: 4,
        conversationId: 2
      }
    ]
  }
];

// function createMessage(data) {
//   var message = {
//     message : data
//   }

// }


module.exports = messages;