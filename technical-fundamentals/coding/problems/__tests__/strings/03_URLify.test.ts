import URLify from "../../03_urlify";

describe('03 - URLify', () =>{
    test("Replaces spaces in a string with '%20'", () =>{
        expect(URLify([...'ab c  '])).toEqual([...'ab%20c']);
    });

    test("Handles leading and trailing spaces", () =>{
        expect(URLify([...'  ab c      '])).toEqual([...'%20%20ab%20c']);
    });

    test("Returns empty string when input is empty", () =>{
        expect(URLify('')).toEqual('');
    });

    test("Doesn't modify string without spaces", () =>{
        expect(URLify([...'abc'])).toEqual([...'abc']);
    });

    test("Handles multiple consecutive spaces", () =>{
        expect(URLify([...'a  b   c          '])).toEqual([...'a%20%20b%20%20%20c']);
    });

    test("Handles special characters", () =>{
        expect(URLify([...'a b!c  '])).toEqual([...'a%20b!c']);
    });

    test("Mr 3ohn Smith", () =>{
        expect(URLify([...'Mr 3ohn Smith    '])).toEqual([...'Mr%203ohn%20Smith']);
    });
});
