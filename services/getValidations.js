import axios from "axios";
import { setJournalValidation } from "../store/journalValidation";

export default async function getValidators(journals, token, dispatch) {
    const promises = journals.map(
        (journal) =>
            new Promise(async (resolve, reject) => {
                try {
                    if (journal.accesses.includes("write")) {
                        const url = `http://192.168.1.2:1009/qd/v1/api/journal/${journal.id}/value`;
                        const headers = { Authorization: `Bearer ${token}` };
                        const response = await axios.get(url, { headers });
                        dispatch(setJournalValidation({ [journal.name]: response.data }));
                    }
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
    );
    await Promise.all(promises);
}
