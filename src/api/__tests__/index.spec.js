import Requests from '../index'
import faker from 'faker'

jest.setTimeout(30000);

test("Success: GET: health()", async () => {
		const response = await Requests.get.health()
		expect(response.status).toBe(200)
})

test("Fail404: GET: user(user_id)", async () => {
		const response = await Requests.get.user("userId")
		expect(response).toBe("Request failed with status code 404")
})

test("POST: user(user_id)", async () => {
		const response = await Requests.post.user(faker.name.findName())
    console.log(response.status)
		expect(response.status).toBe(201)
		expect(response.statusText).toBe("Created")
})



