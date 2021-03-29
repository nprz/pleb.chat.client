const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const { PubSub } = require("apollo-server");
const { verifyToken } = require("./utils/verifyToken");

const prisma = new PrismaClient();
const pubsub = new PubSub();

// Resolvers
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const User = require("./resolvers/User");
const Message = require("./resolvers/Message");
const ChatRoom = require("./resolvers/ChatRoom");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Message,
  ChatRoom,
};

// get userID from authpayload, make sure the id provided when posting matches
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: async ({ req, ...rest }) => {
    let isAuthenticated = false;
    try {
      const authHeader = req.headers.authorization || "";
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        const payload = await verifyToken(token);
        isAuthenticated = payload && payload.sub ? true : false;
      }
    } catch {
      console.error(error);
    }

    return {
      prisma,
      pubsub,
      isAuthenticated,
      req,
      ...rest,
    };
  },
});

server
  .listen({ port: 4001 })
  .then(({ url }) => console.log(`Server is running on ${url}`));

exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
