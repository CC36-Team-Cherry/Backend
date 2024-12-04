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
      //id: 1,
      company_id: 1,
      team_name: "Tim's Team",
    }
  });

  const seedTeam2 = await prisma.team.upsert({
    where: { id: 2 },
    update: {},
    create: {
      //id: 2,
      company_id: seedCompany.id,
      team_name: "Strategic Thinkers",
    }
  });
  
  const seedTeam3 = await prisma.team.upsert({
    where: { id: 3 },
    update: {},
    create: {
      //id: 3,
      company_id: seedCompany.id,
      team_name: "Operations Crew",
    }
  });
  
  const seedTeam4 = await prisma.team.upsert({
    where: { id: 4 },
    update: {},
    create: {
      //id: 4,
      company_id: seedCompany.id,
      team_name: "Creative Innovators",
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
      last_login: new Date('2024-12-03'),
    },
  });

  const seedDavide = await prisma.account.upsert({
    where: { email: "timfan138@hotmail.com" },
    update: {},
    create: {
      //id: 2,
      auth_key: "O6NH9rzJujVTmIiiTOLmtZDxO9k2",
      email: "timfan138@hotmail.com",
      first_name: "Davide",
      last_name: "Peters",
      birthdate: new Date('1999-12-31'),
      company_id: seedCompany.id,
      join_date: new Date('2024-11-20'),
      role: "assisstant",
      team_id: 1,
      supervisor_id: 1,
      last_login: new Date('2024-12-02'),
    },
  });

  const seedPhil = await prisma.account.upsert({
    where: { email: "surferbro840@hotmail.com" },
    update: {},
    create: {
      //id: 3,
      auth_key: "E9TwIu016HdpN4mZBVJ7mVOFVOO2",
      email: "surferbro840@hotmail.com",
      first_name: "Phil",
      last_name: "Cinna",
      birthdate: new Date('1984-04-21'),
      company_id: seedCompany.id,
      join_date: new Date('2024-11-29'),
      role: "cinnalord",
      team_id: 1,
      supervisor_id: 1,
      last_login: new Date('2024-12-01'),
    },
  });

  const seedAnna = await prisma.account.upsert({
    where: { email: "visionary.anna@fakemail.com" },
    update: {},
    create: {
      auth_key: "YzXQ4Pr6JoV8RgT0PLmF23AsKLM3",
      email: "visionary.anna@fakemail.com",
      first_name: "Anna",
      last_name: "Smith",
      birthdate: new Date('1987-03-14'),
      company_id: seedCompany.id,
      join_date: new Date('2024-12-01'),
      role: "strategist",
      team_id: 2,
      last_login: new Date('2024-11-30'),
    },
  });
  
  const seedCarlos = await prisma.account.upsert({
    where: { email: "data.carlos@fakemail.com" },
    update: {},
    create: {
      auth_key: "JqkR72mTp45ZN6bLoXpVdW1YUfA8",
      email: "data.carlos@fakemail.com",
      first_name: "Carlos",
      last_name: "Diaz",
      birthdate: new Date('1992-08-23'),
      company_id: seedCompany.id,
      join_date: new Date('2024-12-02'),
      role: "analyst",
      team_id: 2,
      supervisor_id: 2,
      last_login: new Date('2024-11-29'),
    },
  });
  
  const seedEmily = await prisma.account.upsert({
    where: { email: "operations.emily@fakemail.com" },
    update: {},
    create: {
      auth_key: "M7VWPxYqf9N2HL4KoZuR65TJLB3A",
      email: "operations.emily@fakemail.com",
      first_name: "Emily",
      last_name: "Johnson",
      birthdate: new Date('1990-11-02'),
      company_id: seedCompany.id,
      join_date: new Date('2024-12-03'),
      role: "coordinator",
      team_id: 3,
      supervisor_id: 2,
      last_login: new Date('2024-11-28'),
    },
  });
  
  const seedMark = await prisma.account.upsert({
    where: { email: "manager.mark@fakemail.com" },
    update: {},
    create: {
      auth_key: "T9XN7mRVQWpL6Y5ZJo4VKp3FuZ83",
      email: "manager.mark@fakemail.com",
      first_name: "Mark",
      last_name: "Brown",
      birthdate: new Date('1985-07-15'),
      company_id: seedCompany.id,
      join_date: new Date('2024-12-04'),
      role: "manager",
      team_id: 3,
      supervisor_id: 1,
      last_login: new Date('2024-11-27'),
    },
  });
  
  const seedSophie = await prisma.account.upsert({
    where: { email: "designer.sophie@fakemail.com" },
    update: {},
    create: {
      auth_key: "K5LWN7XRJVoP6Y39mTfQ4YZ2B8AL",
      email: "designer.sophie@fakemail.com",
      first_name: "Sophie",
      last_name: "Taylor",
      birthdate: new Date('1995-05-20'),
      company_id: seedCompany.id,
      join_date: new Date('2024-12-05'),
      role: "designer",
      team_id: 4,
      supervisor_id: 6,
      last_login: new Date('2024-11-27'),
    },
  });
  
  const seedNathan = await prisma.account.upsert({
    where: { email: "dev.nathan@fakemail.com" },
    update: {},
    create: {
      auth_key: "Q3NZ5X7TLMWP4KoV9R2Y8YJ6RfA1",
      email: "dev.nathan@fakemail.com",
      first_name: "Nathan",
      last_name: "Harris",
      birthdate: new Date('1993-09-12'),
      company_id: seedCompany.id,
      join_date: new Date('2024-12-06'),
      role: "developer",
      team_id: 4,
      supervisor_id: 6,
      last_login: new Date('2024-11-26'),
    },
  });
  
  const seedOlivia = await prisma.account.upsert({
    where: { email: "leader.olivia@fakemail.com" },
    update: {},
    create: {
      auth_key: "R8XL5Y3QMTWN9VP6J2ZKo4YAFBL7",
      email: "leader.olivia@fakemail.com",
      first_name: "Olivia",
      last_name: "Wilson",
      birthdate: new Date('1988-01-10'),
      company_id: seedCompany.id,
      join_date: new Date('2024-12-07'),
      role: "team_lead",
      team_id: 4,
      supervisor_id: 7,
      last_login: new Date('2024-11-24'),
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
      status: "Pending",
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
      status: "Pending",
      type: "fun",
      day: new Date('2024-12-13'),
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
      status: "Pending",
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
    where: { account_id: seedPhil.id },
    update: {},
    create: {
      account_id: seedPhil.id,
      is_admin: false,
      is_supervisor: true,
    }
  });

  const seedAnnaPrivileges = await prisma.privileges.upsert({
    where: { account_id: seedAnna.id },
    update: {},
    create: {
      account_id: seedAnna.id,
      is_admin: false,
      is_supervisor: false,
    }
  });
  
  const seedCarlosPrivileges = await prisma.privileges.upsert({
    where: { account_id: seedCarlos.id },
    update: {},
    create: {
      account_id: seedCarlos.id,
      is_admin: false,
      is_supervisor: false,
    }
  });
  
  const seedEmilyPrivileges = await prisma.privileges.upsert({
    where: { account_id: seedEmily.id },
    update: {},
    create: {
      account_id: seedEmily.id,
      is_admin: false,
      is_supervisor: true,
    }
  });
  
  const seedMarkPrivileges = await prisma.privileges.upsert({
    where: { account_id: seedMark.id },
    update: {},
    create: {
      account_id: seedMark.id,
      is_admin: true,
      is_supervisor: true,
    }
  });
  
  const seedSophiePrivileges = await prisma.privileges.upsert({
    where: { account_id: seedSophie.id },
    update: {},
    create: {
      account_id: seedSophie.id,
      is_admin: false,
      is_supervisor: false,
    }
  });
  
  const seedNathanPrivileges = await prisma.privileges.upsert({
    where: { account_id: seedNathan.id },
    update: {},
    create: {
      account_id: seedNathan.id,
      is_admin: false,
      is_supervisor: false,
    }
  });
  
  const seedOliviaPrivileges = await prisma.privileges.upsert({
    where: { account_id: seedOlivia.id },
    update: {},
    create: {
      account_id: seedOlivia.id,
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

  const seedAnnaPTO = await prisma.pTO.upsert({
    where: { account_id: seedAnna.id },
    update: {},
    create: {
      account_id: seedAnna.id,
      remaining_pto: 120,
    }
  });
  
  const seedCarlosPTO = await prisma.pTO.upsert({
    where: { account_id: seedCarlos.id },
    update: {},
    create: {
      account_id: seedCarlos.id,
      remaining_pto: 85,
    }
  });
  
  const seedEmilyPTO = await prisma.pTO.upsert({
    where: { account_id: seedEmily.id },
    update: {},
    create: {
      account_id: seedEmily.id,
      remaining_pto: 50,
    }
  });
  
  const seedMarkPTO = await prisma.pTO.upsert({
    where: { account_id: seedMark.id },
    update: {},
    create: {
      account_id: seedMark.id,
      remaining_pto: 200,
    }
  });
  
  const seedSophiePTO = await prisma.pTO.upsert({
    where: { account_id: seedSophie.id },
    update: {},
    create: {
      account_id: seedSophie.id,
      remaining_pto: 70,
    }
  });
  
  const seedNathanPTO = await prisma.pTO.upsert({
    where: { account_id: seedNathan.id },
    update: {},
    create: {
      account_id: seedNathan.id,
      remaining_pto: 40,
    }
  });
  
  const seedOliviaPTO = await prisma.pTO.upsert({
    where: { account_id: seedOlivia.id },
    update: {},
    create: {
      account_id: seedOlivia.id,
      remaining_pto: 95,
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
