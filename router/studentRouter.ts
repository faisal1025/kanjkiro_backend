const express = require('express')
import { PrismaClient, Student } from '@prisma/client'

const prisma = new PrismaClient()

const router = express.Router()

router.route('/create')
    .post(async (req: any, res: any) => {
        var {studentName, fatherName, motherName, dateOfBirth, 
            gender, aadharNumber, penNumber, cls, admissionNumber, dateOfAdmission, 
            accountNumber, IFSC, nameOfBank} = req.body

        dateOfBirth = new Date(dateOfBirth)
        dateOfAdmission = new Date(dateOfAdmission)

        async function main() {
            const result = await prisma.student.create({
                data: {
                    studentName, fatherName, motherName, dateOfBirth, 
                    gender, aadharNumber, penNumber, cls, admissionNumber, dateOfAdmission, 
                    accountNumber, IFSC, nameOfBank
                },
              })
            
              return result
        }
        main()
        .then(async (result: Student) => {
            await prisma.$disconnect()
            res.json(result)
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            res.json(e)
        })

    })

router.route('/getall')
    .get(async (req: any, res: any) => {
        const query = req.query.query || ""
        const page = Number(req.query.page) || 1
        const perPage = 10
        console.log('search: ', query);
        
        async function main() {  
            const allUsers = query === '' ? await prisma.student.findMany({
                skip: Number((page-1)*perPage),
                take: perPage
            }) : await prisma.student.findMany({
                skip: Number((page-1)*perPage),
                take: perPage,
                where: {
                    aadharNumber: query
                }
            })
            
            const total = query === '' ? await prisma.student.count() : await prisma.student.count({
                where: {
                    aadharNumber: query
                },
            })

            const result = {
                data: allUsers,
                pagination: {
                    page: page,
                    pageSize:  allUsers.length,
                    pageCount: Math.ceil(total / perPage),
                    total: total
                }
            }

            return result;
        }
        main()
        .then(async (result: {data: Student[], pagination: {page:number, pageSize:number, pageCount:number, total:number}}) => {
            await prisma.$disconnect()
            res.json(result)
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            res.json(e)
        })

    })

router.route('/update/:id')
    .put(async (req: any, res: any) => {
        const {id} = req.params;
        var {studentName, fatherName, motherName, dateOfBirth, 
            gender, aadharNumber, penNumber, cls, admissionNumber, dateOfAdmission, 
            accountNumber, IFSC, nameOfBank} = req.body
        
        dateOfBirth = new Date(dateOfBirth)
        dateOfAdmission = new Date(dateOfAdmission)
        

        async function main() { 
            const result = await prisma.student.update({
                where: {id: Number(id)},
                data: {studentName, fatherName, motherName, dateOfBirth, 
                    gender, aadharNumber, penNumber, cls, admissionNumber, dateOfAdmission, 
                    accountNumber, IFSC, nameOfBank}
            })   
            return result
        }
        main()
        .then(async (result: Student) => {
            await prisma.$disconnect()
            res.json(result)
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            res.json(e)
        })
        
       
    })

router.route('/delete/:id')
    .delete(async (req: any, res: any) => {
        const {id} = req.params;

        async function main() { 
            const result = await prisma.student.delete({
                where: {id: Number(id)}
            })   
            console.log(result, { depth: null })
            return result
        }
        main()
        .then(async (result: Student) => {
            await prisma.$disconnect()
            res.json(result)
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            res.json(e)
        })
        
       
    })

module.exports = router




