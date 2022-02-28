import { useReducer, useState } from "react";

export default function HobbiesUseReducer() {
    const [input, setInput] = useState("");
    const HobbiesReducer = (state, action) => {
        if (action.type === "add") {
            if (input.length === 0) {
                return { hobbies: [...state.hobbies] };
            }
            return { hobbies: [...state.hobbies, input] };
        }
        if (action.type === "remove") {
            let updatedHobbies = [];
            [...state.hobbies].filter((val, index) => {
                if (action.toRemove !== val) {
                    updatedHobbies.push(val);
                }
            });
            return { hobbies: updatedHobbies };
        }
        if (action.type === "reset") {
            return { hobbies: [] };
        }
    };
    const initialState = { hobbies: ["initial hobby 1", "Initial Hobby 2"] };
    const [state, dispatch] = useReducer(HobbiesReducer, initialState);
    return (
        <div className="componentContainer">
            <h1 className="heading">Hobbies</h1>
            <div className="formelements">
                <input
                    type="text"
                    name="hobby"
                    onInput={(event) => {
                        setInput(event.target.value);
                    }}
                    value={input}
                />
                <button
                    className="add"
                    onClick={() => {
                        dispatch({ type: "add" });
                    }}
                >
                    ADD
                </button>
                <button
                    className="reset"
                    onClick={() => {
                        dispatch({ type: "reset" });
                    }}
                >
                    RESET
                </button>
            </div>
            <div>
                {state.hobbies.map((hobby, index) => {
                    return (
                        <div className="hobbyContainer" key={hobby + index}>
                            <button
                                className="removeHobbyButton"
                                onClick={() => {
                                    dispatch({
                                        type: "remove",
                                        toRemove: hobby,
                                    });
                                }}
                            >
                                Remove
                            </button>
                            <h3 className="hobbyText">{hobby}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
