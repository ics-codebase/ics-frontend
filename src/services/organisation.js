import axios from "axios";
import Cookies from "js-cookie";

const organisationService = {
    async createOrganisation(org) {
        try {
            const user = JSON.parse(Cookies.get("user"));

            var config = {
                headers: { Authorization: "bearer " + user.token },
            };

            let res = await axios.post(
                process.env.REACT_APP_API_URI + "/organisation",
                org,
                config
            );
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    async saveOrganisation(org) {
        try {
            const user = JSON.parse(Cookies.get("user"));

            var config = {
                headers: { Authorization: "bearer " + user.token },
            };

            if (org._id) {
                let res = await axios.put(
                    process.env.REACT_APP_API_URI + "/organisation",
                    org,
                    config
                );
                return res.data;
            } else {
                let res = await axios.post(
                    process.env.REACT_APP_API_URI + "/organisation",
                    org,
                    config
                );
                return res.data;
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    },

    async saveOrganisationAvatar(orgid, file) {
        try {
            const user = JSON.parse(Cookies.get("user"));

            var config = {
                headers: {
                    Authorization: "bearer " + user.token,
                    "Content-Type": "multipart/form-data",
                },
            };

            var fd = new FormData();
            fd.append("avatar", file);

            for (var key of fd.entries()) {
            }

            const url =
                process.env.REACT_APP_API_URI +
                "/organisation/uploadavatar/" +
                orgid;

            const res = await axios.post(url, fd, config);

            return res;
        } catch (err) {
            console.log(err);
            return err;
        }
    },

    async getOrganisation() {
        try {
            const user = JSON.parse(Cookies.get("user"));

            var config = {
                headers: { Authorization: "bearer " + user.token },
            };

            let res = await axios.get(
                process.env.REACT_APP_API_URI + "/organisation/",
                config
            );

            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    getOrganisationSync() {
        const user = JSON.parse(Cookies.get("user"));

        var config = {
            headers: { Authorization: "bearer " + user.token },
        };

        return axios.get(
            process.env.REACT_APP_API_URI + "/organisation/",
            config
        );
    },
};

export default organisationService;
