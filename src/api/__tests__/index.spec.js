/* eslint-disable jest/no-commented-out-tests */
import { UserAPI } from '../index';

jest.setTimeout(30000);

test.skip("Success: GET: all users", async () => {
		const response = await UserAPI.getAll()
		expect(response.status).toBe(200)
})

test.skip("Fail404: GET: user(user_id)", async () => {
		const response = await UserAPI.getSingle("userId");
		expect(response).toBe("Request failed with status code 404");
})

/** Not Stable
	Error: execution reverted: transfer value exceeded balance of sender
	test("POST: user(user_id)", async () => {
			const response = await Requests.post.user(faker.name.findName())
			console.log(response.status)
			expect(response.status).toBe(201)
			expect(response.statusText).toBe("Created")
	})
*/


