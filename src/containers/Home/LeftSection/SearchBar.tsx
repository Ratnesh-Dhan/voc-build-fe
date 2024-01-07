import { Search } from 'akar-icons';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

let click_suggest_flag = false;

const SearchBar = ({inputRef , search, word,setSearch, searchBox}) => {

  const [suggested, setSuggested] = useState([]);


  const suggestionRef = useRef(null); 

      // Function for removing suggestion box when clicked outsite suggestion box.
      function useOutsideAlerter(ref) {
        useEffect(() => {
          // Function for click event
          function handleOutsideClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              click_suggest_flag = false;
              setSuggested([]);
            }
          }
    
          // Adding click event listener
          document.addEventListener('click', handleOutsideClick);
          return () => document.removeEventListener('click', handleOutsideClick);
        }, [ref]);
      }

        // Calling Suggestions remover function.
        useOutsideAlerter(suggestionRef);

        const suggest = async () => {
            if (search !== '') {
              await axios
                .get(`${process.env.NEXT_PUBLIC_WORD_SUGGESTIONS_API}${search}`)
                .then((response) => {
                  setSuggested(response.data.slice(0, 10));
                });
            }
          };

          const handleKeyEnter = (event) => {
            if (event.key == 'Enter') {
              searchBox(search);
            }
          };

          const suggestionClicked = (val) => {
            setSearch(val);
            searchBox(val);
            click_suggest_flag = false;
          };

          useEffect(() => {
            click_suggest_flag = true;
            if (search === '') setSuggested([]);
        
            const timer = setTimeout(() => {
              suggest();
            }, 500);
        
            return () => clearTimeout(timer);
          }, [search]);

          useEffect(()=>{
            inputRef.current.focus();
            setSuggested([]);
          },[word]);

          useEffect(() => {
            //removeQuery();
            inputRef.current.focus();
          }, []);


  return (
    <div className="relative w-full h-[50px] mt-8 flex flex-row justify-center">
      {/* absolute top-0  left-[50%] translate-x-[-50%] */}
      <div
        className="absolute top-0 md:w-2/3 w-full z-10"
        ref={suggestionRef}
      >
        <div className="flex-col text-slate-800 flex border border-slate-300 rounded-[28px] pl-4 md:w-full w-full py-3 bg-white">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              ref={inputRef}
              className="flex-1 outline-none w-full bg-transparent"
              onKeyDown={handleKeyEnter}
            />
            <div
              className="flex items-center px-4 border-l border-l-slate-300 cursor-pointer h-[100%]"
              onClick={() => {
                searchBox(search);
              }}
            >
              <Search strokeWidth={2} size={16} />
            </div>
          </div>
          <div className="pr-4">
            {click_suggest_flag && suggested.length !== 0 && (
              <div className="border-t border-t-slate-300 w-full">
                {suggested.map((wordSuggestion, index) => (
                  <div
                    className="hover:bg-gray-100"
                    onClick={() => {
                      suggestionClicked(
                        wordSuggestion.substring(
                          0,
                          wordSuggestion.length - 1
                        )
                      );
                    }}
                    key={index}
                  >
                    {' '}
                    {wordSuggestion.substring(
                      0,
                      wordSuggestion.length - 1
                    )}{' '}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar