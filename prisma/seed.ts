import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

  const seedCompany = await prisma.company.upsert({
    where: { id: 1 },
    update: {},
    create: {
      //id: 1,
      name: "Tim's Sorting Company",
    }
  });

  const seedTeam = await prisma.team.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      company_id: 1,
      team_name: "Tim's Team",
    }
  });

  const seedTim = await prisma.account.upsert({
    where: { email: "admin@breezehr.com" },
    update: {},
    create: {
      //id: 1,
      auth_key: "xcHzg440Rsb8EHlULmjXuxxSUMD2",
      email: "admin@breezehr.com",
      first_name: "Tim",
      last_name: "Peters",
      birthdate: new Date('1954-02-19'),
      company_id: seedCompany.id,
      join_date: new Date('2024-11-19'),
      role: "emperor",
      team_id: 1,
    },
  });

  const seedDavide = await prisma.account.upsert({
    where: { email: "timfan69@hotmail.com" },
    update: {},
    create: {
      //id: 2,
      auth_key: "0o5o0vscCuY4UWGyei4ohehzWWG3",
      email: "timfan69@hotmail.com",
      first_name: "Davide",
      last_name: "Peters",
      birthdate: new Date('1999-12-31'),
      company_id: seedCompany.id,
      join_date: new Date('2024-11-20'),
      role: "assisstant",
      team_id: 1,
      supervisor_id: 1,
    },
  });

  const seedPhil = await prisma.account.upsert({
    where: { email: "surferbro840@hotmail.com" },
    update: {},
    create: {
      //id: 3,
      auth_key: "MQXNz6U8lvR8Ys2r2VkqEybb3dX2",
      email: "surferbro840@hotmail.com",
      first_name: "Phil",
      last_name: "Cinna",
      birthdate: new Date('1984-04-21'),
      company_id: seedCompany.id,
      join_date: new Date('2024-11-29'),
      role: "cinnalord",
      team_id: 1,
      supervisor_id: 1,
    },
  });

  const seedAttendance = await prisma.attendanceRecord.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      account_id: seedTim.id,
      day: new Date('2024-11-20'),
      punch_in: new Date(2024, 10, 20, 9, 0, 0),
      punch_out: new Date(2024, 10, 20, 17, 0, 0),
      break_amount: 1.0,
      totalHours: 7.0,
    },
  });

  const seedAttendance2 = await prisma.attendanceRecord.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      account_id: seedTim.id,
      day: new Date('2024-11-21'),
      punch_in: new Date(2024, 10, 21, 9, 0, 0),
      punch_out: new Date(2024, 10, 21, 17, 0, 0),
      break_amount: 1.0,
      totalHours: 7.0,
    },
  });

  const seedAttendance3 = await prisma.attendanceRecord.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      account_id: seedDavide.id,
      day: new Date('2024-11-21'),
      punch_in: new Date(2024, 10, 21, 9, 0, 0),
      punch_out: new Date(2024, 10, 21, 20, 0, 0),
      break_amount: 1.0,
      totalHours: 7.0,
    },
  });

  const seedPTORequest = await prisma.pTORequest.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      account_id: seedDavide.id,
      supervisor_id: seedTim.id,
      content: "I will go to ToToTo.",
      status: "pending",
      day: new Date('2024-12-14'),
      all_day: true,
    }
  });

  const seedSpecialPTORequest = await prisma.specialPTORequest.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      account_id: seedDavide.id,
      supervisor_id: seedTim.id,
      content: "I will fly back to Italy.",
      status: "pending",
      type: "fun",
      day: new Date('2024-12-14'),
    }
  });

  const seedMonthlyRequest = await prisma.monthlyRequest.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      account_id: seedDavide.id,
      supervisor_id: seedTim.id,
      month: 10,
      year: 2024,
      content: "My attendance for November 2024.",
      status: "pending",
    },
  });

  const seedTimPrivleges = await prisma.privileges.upsert({
    where: { account_id: seedTim.id },
    update: {},
    create: {
      account_id: seedTim.id,
      is_admin: true,
      is_supervisor: true,
    }
  });

  const seedDavidePrivleges = await prisma.privileges.upsert({
    where: { account_id: seedDavide.id },
    update: {},
    create: {
      account_id: seedDavide.id,
      is_admin: false,
      is_supervisor: false,
    }
  });

  const seedPhilPrivleges = await prisma.privileges.upsert({
    where: { account_id: seedDavide.id },
    update: {},
    create: {
      account_id: seedPhil.id,
      is_admin: false,
      is_supervisor: true,
    }
  });

  const seedTimPTO = await prisma.pTO.upsert({
    where: { account_id: seedTim.id},
    update: {},
    create: {
      account_id: seedTim.id,
      remaining_pto: 1000,      
    }
  });

  const seedDavidePTO = await prisma.pTO.upsert({
    where: { account_id: seedDavide.id},
    update: {},
    create: {
      account_id: seedDavide.id,
      remaining_pto: 0,      
    }
  });

  const seedPhilPTO = await prisma.pTO.upsert({
    where: { account_id: seedPhil.id},
    update: {},
    create: {
      account_id: seedPhil.id,
      remaining_pto: 34,      
    }
  });

  const seedSpecialPTO = await prisma.specialPTO.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      account_id: seedTim.id,
      type: "fun",
    }
  });


  console.log("Seed data inserted successfully:", { seedCompany, seedTim, seedDavide, seedTeam, seedAttendance, seedAttendance2, seedAttendance3, seedPTORequest, seedSpecialPTORequest, seedMonthlyRequest, seedTimPrivleges, seedDavidePrivleges, seedTimPTO, seedDavidePTO })
}
main()
  .then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1)
})
