import mongoose from "mongoose";
import { TweetModel } from "../TweetModel";
import { UserModel } from "../UserModel";
import { UserCntrl } from "../../controllers/UserController";

const mongodb = "mongodb://127.0.0.1/my_test_database";
mongoose.connect(mongodb);

describe("User Model", () => {
  const data = {
    email: "test4@test.com",
    fullname: "user test4",
    username: "user test4",
    password: "qwerty123",
  };

  const users = [
    {
      email: "test@test.com",
      fullname: "user test1",
      username: "user test1",
      password: "qwerty123",
    },
    {
      email: "test2@test.com",
      fullname: "user test2",
      username: "user test2",
      password: "qwerty123",
    },
    {
      email: "test3@test.com",
      fullname: "user test3",
      username: "user test3",
      password: "qwerty123",
    },
  ];

  beforeAll(async () => {
    await UserModel.remove({});
  });

  beforeEach(async () => {
    await UserModel.insertMany(users);
  });

  afterEach(async () => {
    await UserModel.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("initial test", () => {
    expect(UserModel).toBeDefined();
  });

  it("ASYNC should return created user", async () => {
    const response = await UserModel.create(data);
    expect(response.email).toBe("test4@test.com");
    expect(response._id).toBeDefined();
  });

  it("ASYNC user shouldn't be created without required email", async () => {
    let error = null;

    try {
      await UserModel.create({
        fullname: "user test4",
        username: "user test4",
        password: "qwerty123",
      });
    } catch (e) {
      error = e;
    }

    expect(error).not.toBeNull();
  });

  it("ASYNC user shouldn't be created with the same email", async () => {
    let error = null;

    try {
      await UserModel.create({
        email: "test@test.com",
        fullname: "user test4",
        username: "user test4",
        password: "qwerty123",
      });
    } catch (e) {
      error = e;
    }

    expect(error).not.toBeNull();
  });

  it("ASYNC should return added and one users", async () => {
    const responseUsers = await UserModel.find({});
    const responseOneUser = await UserModel.findOne({ email: "test@test.com" });

    expect(responseUsers.length).toBe(3);
    expect(responseOneUser.username).toBe("user test1");
  });

  it("ASYNC shouldn't be passwort in response", async () => {
    const responseOneUser = await UserModel.findOne({
      email: "test2@test.com",
    });
    const responseWithoutPassword = responseOneUser.toJSON();

    expect(responseWithoutPassword.password).not.toBeDefined();
  });

  describe("Tweet Model", () => {
    it("init Tweet Model", async () => {
      const firstUser = await UserModel.findOne({ email: "test@test.com" });
      const tweet = await TweetModel.create({
        text: "user test text",
        user: firstUser._id,
      });

      expect(TweetModel).toBeDefined();
      expect(tweet._id).toBeDefined();
      expect(tweet.text).toBe("user test text");
    });

    it("shouldn't create tweet without required field 'user'", async () => {
      let error = null;
      try {
        await TweetModel.create({
          text: "user test text",
        });
      } catch (e) {
        error = e;
      }

      expect(error).not.toBeNull();
    });

    it("shouldn't create tweet without required field 'text'", async () => {
      let error = null;
      try {
        const firstUser = await UserModel.findOne({ email: "test@test.com" });
        await TweetModel.create({
          user: firstUser._id,
        });
      } catch (e) {
        error = e;
      }

      expect(error).not.toBeNull();
    });

    describe("User Controller", () => {
      it("User Controller index function", async () => {
        await UserModel.remove({});

        const res = {
          json: jest.fn(),
        };

        const spy = jest.spyOn(res, "json");

        await UserCntrl.index(null, res);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({ status: "success", data: [] });
      });

      it("User Controller show function positive result", async () => {
        const firstUser = await UserModel.findOne({ email: "test@test.com" });
        const req = {
          params: {
            id: firstUser._id,
          },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn(),
          send: jest.fn(),
        };

        const jsonSpy = jest.spyOn(res, "json");
        const statusSpy = jest.spyOn(res, "status");
        const sendSpy = jest.spyOn(res, "send");

        await UserCntrl.show(req, res);

        expect(jsonSpy).toHaveBeenCalled();
        expect(statusSpy).toHaveBeenCalled();
        expect(sendSpy).not.toHaveBeenCalled();
        expect(statusSpy).toHaveBeenCalledWith(200);
      });

      it("User Controller show function without normal id format", async () => {
        const req = {
          params: {
            id: 1,
          },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn(),
          send: jest.fn(),
        };

        const jsonSpy = jest.spyOn(res, "json");
        const statusSpy = jest.spyOn(res, "status");
        const sendSpy = jest.spyOn(res, "send");

        await UserCntrl.show(req, res);

        expect(jsonSpy).toHaveBeenCalled();
        expect(statusSpy).not.toHaveBeenCalled();
        expect(sendSpy).not.toHaveBeenCalled();
      });

      it("User Controller create function positive result", async () => {
        const req = {
          body: {
            email: "test4@test.com",
            fullname: "user test4",
            username: "user test4",
            password: "qwerty123",
          },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn(),
          send: jest.fn(),
        };

        const jsonSpy = jest.spyOn(res, "json");
        const statusSpy = jest.spyOn(res, "status");
        const sendSpy = jest.spyOn(res, "send");

        await UserCntrl.create(req, res);

        expect(jsonSpy).toHaveBeenCalled();
        expect(statusSpy).toHaveBeenCalled();
        expect(sendSpy).not.toHaveBeenCalled();
        expect(statusSpy).toHaveBeenCalledWith(201);
      });

      it("User Controller create function without password", async () => {
        const req = {
          body: {
            email: "test4@test.com",
            fullname: "user test4",
            username: "user test4",
          },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn(),
        };

        const jsonSpy = jest.spyOn(res, "json");
        const statusSpy = jest.spyOn(res, "status");

        await UserCntrl.create(req, res);

        expect(jsonSpy).toHaveBeenCalled();
        expect(statusSpy).not.toHaveBeenCalled();
      });

      it("User Controller afterLogin function without user", async () => {
        const req = {};
        const res = {
          json: jest.fn(),
          status: jest.fn(),
        };

        const jsonSpy = jest.spyOn(res, "json");

        await UserCntrl.afterLogin(req, res);

        expect(jsonSpy).toHaveBeenCalled();
      });

      it("User Controller afterLogin function with user", async () => {
        const firstUser = await UserModel.findOne({ email: "test@test.com" });
        const req = {
          user: firstUser,
        };
        const res = {
          json: jest.fn(),
          status: jest.fn(),
        };

        const jsonSpy = jest.spyOn(res, "json");
        const statusSpy = jest.spyOn(res, "status");

        await UserCntrl.afterLogin(req, res);

        expect(jsonSpy).toHaveBeenCalled();
        expect(statusSpy).toHaveBeenCalled();
        expect(statusSpy).toHaveBeenCalledWith(200);
      });

      it("User Controller createGoogle function with exist user", async () => {
        const firstUser = await UserModel.findOne({ email: "test@test.com" });
        const req = {
          body: { email: firstUser.email },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn(),
        };

        const jsonSpy = jest.spyOn(res, "json");
        const statusSpy = jest.spyOn(res, "status");

        await UserCntrl.createGoogle(req, res);

        expect(jsonSpy).toHaveBeenCalled();
        expect(statusSpy).toHaveBeenCalled();
        expect(statusSpy).toHaveBeenCalledWith(200);
      });

      it("User Controller createGoogle function without user", async () => {
        const req = {};
        const res = {
          json: jest.fn(),
          status: jest.fn(),
        };

        const jsonSpy = jest.spyOn(res, "json");

        await UserCntrl.createGoogle(req, res);

        expect(jsonSpy).toHaveBeenCalled();
        expect(jsonSpy).toHaveBeenCalledWith({
          message: "Cannot read property 'email' of undefined",
          status: "error",
        });
      });

      it("User Controller createGoogle function with new user", async () => {
        const req = {
          body: {
            email: "test4@test.com",
            fullname: "user test4",
            username: "user test4",
            avatarUrl: ''
          },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn(),
        };

        const jsonSpy = jest.spyOn(res, "json");

        await UserCntrl.createGoogle(req, res);

        expect(jsonSpy).toHaveBeenCalled();
      });

      it("User Controller getUserInfo function with user", async () => {
        const firstUser = await UserModel.findOne({ email: "test@test.com" });
        const req = {
          user: firstUser
        };
        const res = {
          json: jest.fn(),
          status: jest.fn(),
        };

        const jsonSpy = jest.spyOn(res, "json");
        const statusSpy = jest.spyOn(res, "status");

        await UserCntrl.getUserInfo(req, res);

        expect(jsonSpy).toHaveBeenCalled();
        expect(statusSpy).toHaveBeenCalled();
        expect(statusSpy).toHaveBeenCalledWith(200);
    });

    it("User Controller getUserInfo function without user", async () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      const jsonSpy = jest.spyOn(res, "json");
      const statusSpy = jest.spyOn(res, "status");

      await UserCntrl.getUserInfo(req, res);

      expect(jsonSpy).toHaveBeenCalled();
      expect(jsonSpy).toHaveBeenCalledWith({status: "error",
      message: "Cannot read property 'json' of undefined",});
  });

  });
});


})
