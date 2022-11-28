import React from 'react';
import { useTitle } from 'react-use';
import { useQuery } from '@tanstack/react-query';


const Blogs = () => {
    useTitle('Quick SELL- Blogs')
    const { data: blogs = [] } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://sell-dao-server.vercel.app/blogs`, {
                    headers: {
                        'authorization': `token ${localStorage.getItem('quicksellToken')}`
                    }
                });
                const data = await res.json();

                return data
            }
            catch (err) { }
        }
    })

    // console.log(blogs)
    return (
        <div>
            <div className='uppercase text-center text-3xl my-5 font-bold'>knowledge page</div>
            <div>
                {
                    blogs.map(blog => <div className='p-5 my-10 rounded-lg bg-blue-200 ' key={blog.id}>
                        <h3 className='text-2xl font-semibold'>{blog.qus}</h3>
                        <p className='text-xl mt-5 text-justify'>{blog.ans}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Blogs;