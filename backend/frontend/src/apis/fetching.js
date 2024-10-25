import SummaryApi from "../common"

export const fetchUserDetails = async () => {

    const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include"
    })
    const dataApi = await dataResponse.json()
    console.log("data-user", dataResponse)
}