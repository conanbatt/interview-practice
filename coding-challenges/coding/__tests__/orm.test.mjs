import { describe, it, expect, beforeEach } from "vitest";
import { SilverORM } from "../orm"; // Assuming your ORM class is defined in orm.js

describe("ORM Core", () => {
  it("should allow you to create classes", () => {
    class UserModel extends SilverORM {
      name;
    }
    const user = new UserModel({ name: "Test User" });
    expect(user.name).toEqual("Test User");
  });

  describe("should support lifecycle methods", () => {
    class User extends SilverORM {
      name;
    }

    it("it should save records", () => {
      const user = new User({ name: "Test User" });
      expect(user.id).toBeFalsy();
      user.save();
      expect(user.id).toBeTruthy();
    });

    it("it should update records", () => {
      const user = new User({ name: "Test User" });
      user.save();
      user.name = "Another name";
      user.save();
      user.reload();
      expect(user.name).toEqual("Another name");
    });

    it("it should delete records", () => {
      const user = new User({ name: "Test User" });
      user.save();
      user.delete();
      user.reload();
      expect(user.id).toBeFalsy();
    });

    it("It should support hooks around lifecycle methods", () => {
      class User extends SilverORM {
        name;
        beforeSave() {}
        afterSave() {}
      }

      const user = new User({ name: "Test User" });
      user.save();
      expect(User.beforeSave).toHaveBeenCalledOnce();
      expect(User.afterSave).toHaveBeenCalledOnce();
    });

    describe("validations", () => {
      class User extends SilverORM {
        name;
        validations = {
          name: { required: true, unique: true },
        };
      }

      it("should not allow to create dupes", () => {
        const user = new User({ name: "Test User" });
        user.save();
        expect(user.id).toBeTruthy();
        const dupe = new User({ name: "Test User" });
        dupe.save();
        expect(dupe.id).toBeFalsy();
        expect(dupe.errors).toEqual([{ name: "Must be unique" }]);
      });

      it("should not allow to save empty names", () => {
        const user = new User();
        user.save();
        expect(user.id).toBeFalsy();
        expect(dupe.errors).toEqual([{ name: "Must be present" }]);
      });
    });
  });

  describe("Static Methods", () => {
    class User extends SilverORM {
      name;
      address;
      validations = {
        name: { required: true },
        address: { required: true },
      };
    }

    it("should support creating records", () => {
      const user = User.create({ name: "a", address: "b" });
      expect(user.id).toBeTruthy();
    });

    it("should support finding specific records", () => {
      const user = User.create({ name: "a", address: "b" });
      const loaded = User.find({ id: user.id });
      expect(loaded).toBeTruthy();
    });

    it("should support querying records", () => {
      const a = User.create({ name: "a", address: "1" });
      const b = User.create({ name: "b", address: "1" });
      User.create({ name: "c", address: "2" });
      const users = User.where({ address: "1" });
      expect(users).toEqual([a, b]);
    });

    it("should be able to find by attributes", () => {
      const a = User.create({ name: "a", address: "1" });
      let loaded = User.find_by_name("a");
      expect(loaded.id).toEqual(a.id);
      loaded = User.find_by_address("1");
      expect(loaded.id).toEqual(a.id);
    });

    it("should support load all records", () => {
      const a = User.create({ name: "a", address: "1" });
    });
  });

  it("should implement an iterator pattern for cycling through records", () => {
    class User extends SilverORM {
      name;
    }

    User.create({
      name: "Pepe",
    });
    User.create({
      name: "Carlos",
    });

    const iterator = User.iterator();
    let current = iterator.next();

    expect(current.value.name).toBe("Pepe");

    current = iterator.next();
    expect(current.value.name).toBe("Carlos");

    current = iterator.next();
    expect(current.done).toBe(true); // No more records
  });
});

describe("Method chaining", () => {
  class User extends SilverORM {
    name;
    address;
    validations = {
      name: { required: true },
      address: { required: true },
    };
  }

  const a = new User();
  a.update({ name: "pepe" }).update({ address: "address" }).save().reload();
  expect(a.name).toEqual("pepe");
  expect(a.name).toEqual("address");
});

describe("It should support rollbacks and undo's", () => {
  class User extends SilverORM {
    name;
    history = true;
  }

  const a = User.create({ name: "pepe" });
  a.update({ name: "carlos" }).save().update({ name: "quiroga" }).save();
  a.reload();
  expect(a.name).toEqual("quiroga");
  a.rollback().reload();
  expect(a.name).toEqual("carlos");
  a.rollback().reload();
  expect(a.name).toEqual("pepe");
  a.rollback().reload();
  expect(a.name).toEqual("pepe");
});
