import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import SelectDreamQuest from "./SelectDreamQuest";

const URL = 'http://localhost:8080';

const Select = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const question = localStorage.getItem('question');
            console.log(question);

            try {
                const response = await axios.post(URL + "/chat", {
                    question: question,
                });
                console.log(response);
                setLoading(false);
            } catch (error) {
                console.error("데이터 가져오기 오류:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {loading ? <Loading /> : <SelectDreamQuest />}
        </>
    );
};

export default Select;
