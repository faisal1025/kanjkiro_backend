"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express.Router();
router.route('/create')
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var { studentName, fatherName, motherName, dateOfBirth, gender, aadharNumber, penNumber, cls, admissionNumber, dateOfAdmission, accountNumber, IFSC, nameOfBank } = req.body;
    dateOfBirth = new Date(dateOfBirth);
    dateOfAdmission = new Date(dateOfAdmission);
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.student.create({
                data: {
                    studentName, fatherName, motherName, dateOfBirth,
                    gender, aadharNumber, penNumber, cls, admissionNumber, dateOfAdmission,
                    accountNumber, IFSC, nameOfBank
                },
            });
            return result;
        });
    }
    main()
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
        res.json(result);
    }))
        .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
        console.error(e);
        yield prisma.$disconnect();
        res.json(e);
    }));
}));
router.route('/getall')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.query;
    const page = req.query.page;
    const perPage = 10;
    console.log('search: ', query);
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = query === '' ? yield prisma.student.findMany({
                skip: (page - 1) * perPage,
                take: perPage
            }) : yield prisma.student.findMany({
                skip: (page - 1) * perPage,
                take: perPage,
                where: {
                    aadharNumber: query
                },
            });
            const total = query === '' ? yield prisma.student.count() : yield prisma.student.count({
                where: {
                    aadharNumber: query
                },
            });
            const result = {
                data: allUsers,
                pagination: {
                    page: page,
                    pageSize: allUsers.length,
                    pageCount: Math.ceil(total / perPage),
                    total: total
                }
            };
            return result;
        });
    }
    main()
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
        res.json(result);
    }))
        .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
        console.error(e);
        yield prisma.$disconnect();
        res.json(e);
    }));
}));
router.route('/update/:id')
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    var { studentName, fatherName, motherName, dateOfBirth, gender, aadharNumber, penNumber, cls, admissionNumber, dateOfAdmission, accountNumber, IFSC, nameOfBank } = req.body;
    dateOfBirth = new Date(dateOfBirth);
    dateOfAdmission = new Date(dateOfAdmission);
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.student.update({
                where: { id: Number(id) },
                data: { studentName, fatherName, motherName, dateOfBirth,
                    gender, aadharNumber, penNumber, cls, admissionNumber, dateOfAdmission,
                    accountNumber, IFSC, nameOfBank }
            });
            return result;
        });
    }
    main()
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
        res.json(result);
    }))
        .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
        console.error(e);
        yield prisma.$disconnect();
        res.json(e);
    }));
}));
router.route('/delete/:id')
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.student.delete({
                where: { id: Number(id) }
            });
            console.log(result, { depth: null });
            return result;
        });
    }
    main()
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
        res.json(result);
    }))
        .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
        console.error(e);
        yield prisma.$disconnect();
        res.json(e);
    }));
}));
module.exports = router;
