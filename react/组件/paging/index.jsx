import React, { useState, useMemo, useEffect } from 'react'

export default function Paging({ pageSize, total, pageCount, currentPage = 1, callback = e => e }) {

    // const [myPageSize, setMyPageSize] = useState(pageSize); // 每页显示条目个数
    // const [myTotal, setMyTotal] = useState(total);  // 总条目数
    // const [myPageCount, setMyPageCount] = useState(pageCount);  // 总页数
    const [myCurrentPage, setMyCurrentPage] = useState(currentPage); // 当前页数

    const pageList = () => {
        const left = () => {
            if (myCurrentPage > 4 && pageCount > 10) {
                return <li>...</li>
            }
        }
        const right = () => {
            if (myCurrentPage < (pageCount - 3) && pageCount > 10) {
                return <li>...</li>
            }
        }
        const e = pageCount
        let inx = 0
        let len = e <= 10 ? (e - 2) : 5
        if (myCurrentPage > 4 && myCurrentPage < (e - 3) && e > 10) {
            inx = (myCurrentPage - 2)
        } else {
            inx = 2
            if (e > 10 && myCurrentPage > 4) {
                inx = (e - 5)
            }
        }
        let arr = []
        if (len < 1) return <></>
        for (let i = 0; i < len; i++) {
            arr.push(inx)
            inx++
        }
        return (
            <>
                {left()}
                {arr.map((item, index) => <li key={index} className={myCurrentPage == item ? 'xuanzhong' : ''}>{item}</li>)}
                {right()}
            </>
        )
    }

    const mapPagers = () => {
        return <>
            <li>&lt;</li>
            <li className={myCurrentPage == 1 ? 'xuanzhong' : ''}>1</li>
            {pageList()}
            {
                pageCount > 1 ? <li className={myCurrentPage == pageCount ? 'xuanzhong' : ''}>{pageCount}</li> : ''
            }
            <li>&gt;</li>
        </>

    }

    const handClick = e => {
        const text = e.target.innerText
        let page = 1
        switch (text) { 
            case '...':
                return
            case '<':
                if (myCurrentPage == 1) return
                page = myCurrentPage - 1
                break
            case '>':
                if (myCurrentPage == pageCount) return
                page = myCurrentPage + 1
                break
            default:
                if (text == myCurrentPage) return
                page = text - 0
                break;
        }
        setMyCurrentPage(page)
    }

    useEffect(() => {
        callback({
            pageSize,
            total,
            pageCount,
            currentPage: myCurrentPage
        })

    }, [myCurrentPage]);

    const pager = useMemo(() => {
        return (
            <div style={{ width: '500px', height: '30px', margin: '0 auto' }}>
                <ul className='pagingUl' onClick={handClick}>
                    {mapPagers()}
                </ul>
            </div>
        )
    }, [myCurrentPage, pageCount])

    return pager

}

/**
 * .pagingUl li{
 *  width:'30px'; height:'28px'; textAlign:'center'; lineHeight: '28px'; border:'1px #333'; float: 'left'
 * }
 * 
 * .pagingUl .xuanzhong{
 *  border-color: red 
 * }
 * 
 */
